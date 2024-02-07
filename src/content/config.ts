// 1. Import utilities from `astro:content` and zod.
import { z, defineCollection } from 'astro:content';

// 2. Define a constant with your collection
const ephemera = defineCollection({ 
    /* My little bits of experience */ 
    type: "content",
    schema: ({ image }) => z.object({
    isDraft: z.boolean(),
    // In frontmatter, dates written without quotes around them are interpreted as Date objects
    publishDate: z.date(),
    title: z.string().max(35, { message: "Must no more than 35 characters long" }),
    synopsis: z.string().max(280, {message:"You need to cut this back to 280 characters." }),
    category: z.enum(['Reading', 'Viewing', 'Listening', 'Experiencing']),
    image: image().refine( (img) => img.width >= 100, {
      message: "The ephemera image needs to be at least 100 pixels wide.",} ),
      image_alt: z.string(), 
    }).optional(),
    cite: z.string().optional(),
});


// Abandoned in order to be able to use svgs as splash images on articles. The image type check falls over 
// because it can’t check the width.
const writing = defineCollection({ 
    /* My longer article length content */ 
    type: "content",
    schema: ({ image }) => z.object({
    published: z.boolean(),
    // In frontmatter, dates written without quotes around them are interpreted as Date objects
    publishDate: z.date(),
    title: z.string().max(35, { message: "Must no more than 35 characters long" }),
    summary: z.string().max(280, {message:"You need to cut this back to 280 characters." }),
    header_image: image().refine( (img) => img.width >= 2000, {
      message: "The article image needs to be at least 2000 pixels wide.",} ),
    header_image_alt: z.string(), 
    thumb_image: image().refine( (img) => img.width >= 150, {
      message: "The articlethumbnail needs to be at least 150 pixels wide.",} ),
    thumb_image_alt: z.string(), 
    }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'ephemera': ephemera,
  'writing': writing,
};