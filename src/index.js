const { GraphQLServer } = require("graphql-yoga");

// dummy data
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  },
  {
    id: "link-1",
    url: "www.graphql.org",
    description: "Official GraphQL Website"
  }
];
let idCount = links.length;

// resolvers that map query to data retrieval
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, { id }) => links.find(el => el.id === id)
  },
  Mutation: {
    post: (parent, { description, url }) => {
      const link = {
        id: `link-${idCount++}`,
        description: description,
        url: url
      };
      links.push(link);

      return link;
    },
    updateLink: (parent, { id, url, description }) => {
      const idx = links.findIndex(el => el.id === id);
      links[idx].url = url || links[idx].url;
      links[idx].description = description || links[idx].description;

      return links[idx];
    },
    deleteLink: (parent, { id }) => {
      const idx = links.findIndex(el => el.id === id);
      const deleted = links[idx];

      links.splice(idx, 1);

      return deleted;
    }
  }
};

// start up the server passing previously set schema/resolvers
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
