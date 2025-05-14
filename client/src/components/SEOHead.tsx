import { Helmet } from 'react-helmet';
import { getMetaForPage, DEFAULT_META } from '@/lib/metaTags';

interface SEOHeadProps {
  pageName?: string;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string;
  customOgImage?: string;
}

/**
 * Komponente für SEO-Optimierung, die Meta-Tags für verschiedene Seiten bereitstellt
 */
export default function SEOHead({
  pageName,
  customTitle,
  customDescription,
  customKeywords,
  customOgImage
}: SEOHeadProps) {
  // Hole die Meta-Informationen für die angegebene Seite oder verwende Standard-Infos
  const metaInfo = pageName ? getMetaForPage(pageName) : DEFAULT_META;
  
  // Überschreibe mit benutzerdefinierten Werten, falls vorhanden
  const title = customTitle || metaInfo.title;
  const description = customDescription || metaInfo.description;
  const keywords = customKeywords || metaInfo.keywords;
  const ogImage = customOgImage || metaInfo.ogImage || DEFAULT_META.ogImage;
  
  // Erstelle die URL für das OG-Bild
  const siteUrl = window.location.origin;
  const fullOgImageUrl = ogImage?.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={customTitle || metaInfo.ogTitle || title} />
      <meta property="og:description" content={customDescription || metaInfo.ogDescription || description} />
      {ogImage && <meta property="og:image" content={fullOgImageUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={window.location.href} />
      <meta name="twitter:title" content={customTitle || metaInfo.ogTitle || title} />
      <meta name="twitter:description" content={customDescription || metaInfo.ogDescription || description} />
      {ogImage && <meta name="twitter:image" content={fullOgImageUrl} />}
      
      {/* Zusätzliche Meta-Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#0A3A68" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}