import { GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql/type';

const FileType = new GraphQLObjectType({
  name: 'FileType',
  fields: {
    uploadedFile: { type: GraphQLString },
    file: { type: GraphQLString },
    url: { type: GraphQLString },
    fileType: { type: GraphQLString },
    size: { type: GraphQLInt },
  },
});

export default FileType;
