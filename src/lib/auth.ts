import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
//const client = new MongoClient(process.env.MONGODB_URL as string);

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_URL is missing from environment variables");
}
const client = new MongoClient(mongoUrl);

const db = client.db("studiospace");
export const auth = betterAuth({
    
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: { 
    enabled: true, 
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
    },
  },

  socialProviders: {
        google: { 
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string, 
        }, 
    },
    plugins:[
      jwt(),
    ],
    session:{
      cookieCache:{
        enabled:true,
        strategy:'jwt',
        maxAge: 3*24*60*60
      }
    }
});