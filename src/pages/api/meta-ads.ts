import type { NextApiRequest, NextApiResponse } from 'next';

const APP_ID = process.env.META_APP_ID;
const APP_SECRET = process.env.META_APP_SECRET;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
/**
 * 
 * @param limit 
 * @param after 
 * @param ad_delivery_date_min 
 * @param ad_delivery_date_max 
 * @param search_terms 
 * @param ad_reached_countries 
 * @param media_type 
 * @param ad_active_status 
 * @param search_type 
 * @param ad_type 
 * @param languages 
 * @param publisher_platforms 
 * @param search_page_ids 
 * @param unmask_removed_content 
 * @returns 
 * 
 * https://www.facebook.com/ads/library/api/
 */
const getMetaAds = async (
    limit: number = 10,
    after: string | null = null,
    ad_delivery_date_min: string | null = null,
    ad_delivery_date_max: string | null = null,
    search_terms: string | null = null,
    ad_reached_countries: string | null = null,
    media_type: string | null = null,
    ad_active_status: string | null = null,
    search_type:string | null = null,
    ad_type:string | null = null,
    languages: string | null = null,
    publisher_platforms: string | null = null,
    search_page_ids: string | null = null,
     unmask_removed_content: string | null = null
    ) => {
  try {
    if (!APP_ID || !APP_SECRET || !ACCESS_TOKEN) {
      throw new Error('Missing Meta API credentials. Please set META_APP_ID, META_APP_SECRET and META_ACCESS_TOKEN in your .env.local file.');
    }

    if(!ad_reached_countries) {
        throw new Error("ad_reached_countries parameter is required");
    }

    let url = `https://graph.facebook.com/v21.0/ads_archive?fields=ad_creative_link_captions,ad_creative_link_descriptions,ad_snapshot_url,page_id,page_name,publisher_platforms,ad_delivery_date&access_token=${ACCESS_TOKEN}&limit=${limit}&ad_reached_countries=${ad_reached_countries}`;


    if (after) {
        url+= `&after=${after}`;
    }
    if(ad_delivery_date_min) {
        url += `&ad_delivery_date_min=${ad_delivery_date_min}`;
    }
    if(ad_delivery_date_max) {
        url+= `&ad_delivery_date_max=${ad_delivery_date_max}`;
    }
    if(search_terms) {
      url += `&search_terms=${search_terms}`;
    }
     if(media_type) {
      url+= `&media_type=${media_type}`
    }
    if(ad_active_status) {
      url += `&ad_active_status=${ad_active_status}`;
    }
    if(search_type) {
       url += `&search_type=${search_type}`
    }
    if(ad_type) {
         url+= `&ad_type=${ad_type}`;
    }
    if (languages) {
         url += `&languages=${languages}`;
    }
    if (publisher_platforms) {
        url += `&publisher_platforms=${publisher_platforms}`;
    }
    if (search_page_ids) {
        url += `&search_page_ids=${search_page_ids}`;
    }
     if (unmask_removed_content) {
        url += `&unmask_removed_content=${unmask_removed_content}`;
     }

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error:any) {
    console.error("Error fetching meta ads", error)
    throw new Error(error.message || 'Failed to fetch Meta ads data.');
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { limit, after, ad_delivery_date_min, ad_delivery_date_max, search_terms, ad_reached_countries, media_type, ad_active_status, search_type, ad_type, languages, publisher_platforms, search_page_ids, unmask_removed_content } = req.query;
    const availableParameters = [
        'limit',
        'after',
        'ad_delivery_date_min',
        'ad_delivery_date_max',
        'search_terms',
        'ad_reached_countries',
        'media_type',
        'ad_active_status',
        'search_type',
        'ad_type',
        'languages',
        'publisher_platforms',
        'search_page_ids',
        'unmask_removed_content'
    ];
  try {
        if(Object.keys(req.query).length === 0) {
            return res.status(400).json({
                error: "Please provide at least one query parameter. Valid parameters are :",
                availableParameters
            })
        }

    const adsData = await getMetaAds(
      limit ? Number(limit) : 10,
      after ? String(after) : null,
      ad_delivery_date_min ? String(ad_delivery_date_min) : null,
      ad_delivery_date_max ? String(ad_delivery_date_max) : null,
      search_terms ? String(search_terms) : null,
      ad_reached_countries ? String(ad_reached_countries) : null,
      media_type ? String(media_type) : null,
      ad_active_status ? String(ad_active_status) : null,
       search_type ? String(search_type) : null,
       ad_type ? String(ad_type) : null,
         languages ? String(languages) : null,
          publisher_platforms ? String(publisher_platforms) : null,
         search_page_ids ? String(search_page_ids) : null,
        unmask_removed_content ? String(unmask_removed_content) : null
    );

    res.status(200).json(adsData);
  } catch (error:any) {
    res.status(500).json({ error: error.message || 'Failed to fetch ads.' });
  }
}