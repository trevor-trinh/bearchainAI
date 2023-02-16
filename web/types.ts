// Represents a single fandom
// Includes fandom name and AO3 link
interface Fandom {
  name: string;
  link?: string;
}

// Represents list of all fandoms scraped from AO3
// Includes all fandoms and selection of top fandoms from each category
interface FandomJSONData {
  all: Fandom[];
  top: Fandom[];
}

// Represents API request for getting fandoms
// Includes a search string and if the user requests for a random fandom (mutually exclusive)
interface FandomRequest {
  search: string;
  random: boolean;
}

// Represents a single referenced author
// Includes username of author
// interface Author {
//   username: string;
// }

// Represents a single AI generated fanfic
// Includes title, contents of the story, fandom, and author(s) kudos
interface Fanfic {
  title: string;
  content: string;
  fandom: Fandom;
  kudos: Kudo[];
}

// Represents an author and their citations
// Includes author's username and number of citations
interface Kudo {
  author: string;
  cites: number;
}

// Represents query string params to get individual and list of fanfics
// Includes tokenId and number of fanfics to return
interface FanficGETAPI {
  tokenId: number;
  limit?: number;
}

export type {
  Fandom,
  FandomJSONData,
  FandomRequest,
  Fanfic,
  Kudo,
  FanficGETAPI,
};
