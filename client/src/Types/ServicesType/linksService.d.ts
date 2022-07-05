declare interface LinksService {
  createLink: (body: FromLink) => Promise<{ link: LinkDTO }>;
  getLinkById: (linkId: string) => Promise<LinkDTO>;
  fetchAllLinks: () => Promise<LinkDTO[]>;
}

declare interface LinkBody {
  link: string;
}

declare interface FromLink {
  from: string;
}

declare interface LinkDTO {
  clicks: number;
  date: string;
  code: string;
  from: string;
  to: string;
  owner: string;
  _id: string;
}
