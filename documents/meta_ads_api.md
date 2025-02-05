# Facebook Meta Developer Account and Ads Library API

This document provides details about setting up a Facebook Meta Developer account, using the Ads Library API, and the verification process.

## Setting Up a Facebook Meta Developer Account

1.  **Go to Meta for Developers:**

    - Navigate to the [Meta for Developers](https://developers.facebook.com/) website.

2.  **Log in with Your Facebook Account:**

    - Click on "Log In" and use your personal Facebook account to log in.

3.  **Create a New App:**

    - After logging in, navigate to the "My Apps" section.
    - Click on "Create App."
    - Choose "None" for the app type, as you are not building a specific application initially.
    - Enter a name for your app and provide the other requested details.
    - Click on "Create App ID."

4.  **Access Meta Business Suite:**

    - Go to [Meta Business Suite](https://business.facebook.com/) and link your Facebook page to this account, if not already linked

5.  **Create a Meta Business account**

    - You need to create a Meta Business account to access business tools. This account will be used to manage your Facebook page and the Meta Ad library
    - In the business suite follow the on screen instructions to create a business account if you don't have one

6.  **Add Tools to Your App:**

    - Once created, go to the app page and navigate to the "Add Products" section
    - Add the "Marketing API" product to your app.

7.  **Generate Access Token:**
    - To use the Ads Library API, you'll need an access token.
    - In your app page go to Tools > Graph API Explorer
    - Select "Meta Business Suite" from the dropdown, and in "User or Page" dropdown select the Facebook page that is associated with this meta developer account.
    - Grant all required permissions.
    - Click "Generate Access Token" button, and copy the generated access token. Keep it secure.

## Using the Ads Library API

The Ads Library API allows you to search for and analyze ads running on Meta platforms (Facebook, Instagram, etc.).

1.  **Base URL:**

    - The base URL for accessing the Ads Library API is:
      `https://graph.facebook.com/v21.0/ads_archive`
    - Use the latest version if available

2.  **Required Parameters:**

    - `access_token`: Your generated access token from step 7 above.
    - `ad_reached_countries`: A list of countries to search for ads.

3.  **Optional Parameters:**

    - `limit`: Number of ads to fetch in a single api call (default 10, limit 100)
    - `after`: Used for pagination (retrieving the next set of results).
    - `ad_delivery_date_min`: Start date to search ads from.
    - `ad_delivery_date_max`: End date to search ads to.
    - `search_terms`: Search terms to use to filter ads.
    - `media_type`: Filter by media type
    - `ad_active_status`: Filter by active status of ads
    - `search_type`: Type of search performed
    - `ad_type`: Filter by ad type
    - `languages`: Filter ads by language
    - `publisher_platforms`: Filter by platform where ads are displayed.
    - `search_page_ids`: Filter ads by specific page IDs
    - `unmask_removed_content`: Whether to unmask removed content in the results

4.  **Example Request:**

    ```
    https://graph.facebook.com/v21.0/ads_archive?fields=ad_creative_link_captions,ad_creative_link_descriptions,ad_snapshot_url,page_id,page_name,publisher_platforms,ad_delivery_date&access_token={YOUR_ACCESS_TOKEN}&ad_reached_countries=['IN']&limit=10&search_terms=loan
    ```

5.  **Example Response**

```json
{
  "data": [
    {
      "ad_creative_link_captions": [
        "Get your loan approved in minutes! Apply now.",
        "Apply for a loan and fulfill your dreams! Easy and convenient.",
        "Looking for a loan? Get the best rates here."
      ],
      "ad_creative_link_descriptions": [
        "Get instant loan approvals. Don't wait, apply now!",
        "Quick and hassle-free loans available. Apply today!",
        "Your financial needs met with our loan services."
      ],
      "ad_snapshot_url": "https://www.facebook.com/ads/library/?id=612345678901234&access_token=EAAQx...YOUR_ACCESS_TOKEN_END",
      "page_id": "1234567890123",
      "page_name": "Easy Loans",
      "publisher_platforms": ["facebook", "instagram"],
      "ad_delivery_date": "2024-08-09"
    },
    {
      "ad_creative_link_captions": [
        "Get your loan approved in minutes! Apply now.",
        "Apply for a loan and fulfill your dreams! Easy and convenient.",
        "Looking for a loan? Get the best rates here."
      ],
      "ad_creative_link_descriptions": [
        "Get instant loan approvals. Don't wait, apply now!",
        "Quick and hassle-free loans available. Apply today!",
        "Your financial needs met with our loan services."
      ],
      "ad_snapshot_url": "https://www.facebook.com/ads/library/?id=612345678901235&access_token=EAAQx...YOUR_ACCESS_TOKEN_END",
      "page_id": "1234567890124",
      "page_name": "Fast Loans",
      "publisher_platforms": ["facebook", "instagram"],
      "ad_delivery_date": "2024-08-09"
    }
  ],
  "paging": {
    "cursors": {
      "before": "MTAxNTExNTkwODU1MTAwOTgZD",
      "after": "MTAxNTExNTkwODU1NzkwOTgZD"
    }
  }
}
```

## Ads Library API Verification Process

1.  **Initial Access:** Initially, you get access to the API with certain limitations.
2.  **Submit For Verification:** Meta requires you to submit your use case to get your access approved and to increase your API limits.
3.  **Compliance:** Make sure your use case is compliant with Meta's policy.
    - [Meta Platform Policy](https://developers.facebook.com/policy/)
4.  **Review:** Meta will review your application and use case and provide approval, you might need to provide additional documentation for verification.
5.  **Increased Limits**: Once verified, the api limits for your account will be increased.

## Links

- [Meta Platform Policy](https://developers.facebook.com/policy/)
- [Meta Ad Library API](https://www.facebook.com/ads/library/api/)
