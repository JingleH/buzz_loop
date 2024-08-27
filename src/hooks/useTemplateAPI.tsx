import { useQuery } from '@tanstack/react-query';
import { TemplateInfo } from '../Template';

async function getTemplateInfo(template: Template): Promise<TemplateInfo> {
  if (isVideoTemplate(template)) {
    const videoInfo = await getVideo(template);
    return {
      ...videoInfo,
      branchUrl: template.customLinks.branchUrl,
      topics: template.topics,
      title: template?.['dc:title']?.['i-default'] ?? 'Adobe Express Template',
    };
  }
  return {
    src: getImageSrc(template),
    branchUrl: template.customLinks.branchUrl,
    topics: template.topics,
    title: template?.['dc:title']?.['i-default'] ?? 'Adobe Express Template',
  };
}
interface Template {
  customLinks: { branchUrl: string };
  topics: string[];
  'dc:title': {
    'i-default': string;
  };
  pages: {
    rendition: {
      image: {
        thumbnail: {
          componentId: string;
          hzRevision: string;
          mediaType: string;
        };
      };
      video?: {
        thumbnail: {
          componentId: string;
          hzRevision: string;
        };
      };
    };
  }[];
  _links: {
    'http://ns.adobe.com/adobecloud/rel/rendition': {
      href: string;
    };
    'http://ns.adobe.com/adobecloud/rel/component': {
      href: string;
    };
  };
}
interface VideoTemplate extends Template {
  pages: {
    rendition: {
      image: {
        thumbnail: {
          componentId: string;
          hzRevision: string;
          mediaType: string;
        };
      };
      video: {
        thumbnail: {
          componentId: string;
          hzRevision: string;
        };
      };
    };
  }[];
}
interface APIResponse {
  items: Template[];
  metadata: { totalHits: number };
}

function isVideoTemplate(template: Template): template is VideoTemplate {
  return !!template.pages[0].rendition.video;
}

function getImageSrc(template: Template) {
  const thumbnail = template.pages[0].rendition.image?.thumbnail;
  const componentLinkHref = template._links['http://ns.adobe.com/adobecloud/rel/component'].href;
  const renditionLinkHref = template._links['http://ns.adobe.com/adobecloud/rel/rendition'].href;
  const { mediaType, componentId, hzRevision } = thumbnail;
  if (mediaType === 'image/webp') {
    // webp only supported by componentLink
    return componentLinkHref.replace(
      '{&revision,component_id}',
      `&revision=${hzRevision || 0}&component_id=${componentId}`,
    );
  }

  return renditionLinkHref.replace(
    '{&page,size,type,fragment}',
    `&type=${mediaType}&fragment=id=${componentId}`,
  );
}

const videoMetadataType = 'application/vnd.adobe.ccv.videometadata';

async function getVideo(template: VideoTemplate) {
  const videoThumbnail = template.pages[0].rendition.video.thumbnail;
  const renditionLinkHref = template._links['http://ns.adobe.com/adobecloud/rel/rendition'].href;
  const { componentId } = videoThumbnail;
  const preLink = renditionLinkHref.replace(
    '{&page,size,type,fragment}',
    `&type=${videoMetadataType}&fragment=id=${componentId}`,
  );
  const backupPosterSrc = getImageSrc(template);
  try {
    const response = await fetch(preLink);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const {
      renditionsStatus: { state },
      posterframe,
      renditions,
    } = await response.json();
    if (state !== 'COMPLETED') throw new Error('Video not ready');

    const mp4Rendition = renditions.find(
      (r: { videoContainer: string }) => r.videoContainer === 'MP4',
    );
    if (!mp4Rendition?.url) throw new Error('No MP4 rendition found');

    return { src: mp4Rendition.url, poster: posterframe?.url || backupPosterSrc };
  } catch (err) {
    console.error('in getting video url: ', err, JSON.stringify(template));
    return { src: backupPosterSrc };
  }
}

export default function useTemplateAPI(q: string, animated: boolean, limit: number = 10) {
  const { data, isPending, isError } = useQuery({
    queryKey: [q, animated],
    queryFn: async () => {
      let url = `https://www.adobe.com/express-search-api-v3?collectionId=urn:aaid:sc:VA6C2:25a82757-01de-4dd9-b0ee-bde51dd3b418&queryType=search&filters=licensingCategory==free&limit=${limit}`;
      if (animated) url += '&filters=behaviors==animated';
      if (q) url += `&q=${q}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('template fetch failed');
      }
      const json: APIResponse = await response.json();
      const promises = json.items.map((template) => {
        return getTemplateInfo(template);
      });
      const res = await Promise.all(promises);
      return { data: res, metadata: json.metadata };
    },
  });
  return { data, isError, isPending };
}
