export type TCommitRoot = {
  sha: string;
  node_id: string;
  commit: TCommit;
  url: string;
  html_url: string;
  comments_url: string;
  author: TCommitRootAuthor;
  committer: TCommitRootAuthor;
  parents: TCommitRootParent[];
}

export type TCommitRootAuthor = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export type TCommit  = {
  author: TCommitAuthor;
  committer: TCommitAuthor;
  message: string;
  tree: TCommitTree;
  url: string;
  comment_count: number;
  verification: TCommitVerification;
}

export type TCommitAuthor  = {
  name: string;
  email: string;
  date: Date;
}

export type TCommitTree = {
  sha: string;
  url: string;
}

export type  TCommitVerification = {
  verified: boolean;
  reason: string;
  signature: null;
  payload: null;
}

export type TCommitRootParent =  {
  sha: string;
  url: string;
  html_url: string;
}
