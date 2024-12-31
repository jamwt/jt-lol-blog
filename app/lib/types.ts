export interface BlogPostSummary {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostSummary {
  html: string;
  draft: boolean;
}
