import product1 from "@/assets/products/product-1.jpg";
import product2 from "@/assets/products/product-2.jpg";
import product3 from "@/assets/products/product-3.jpg";
import product4 from "@/assets/products/product-4.jpg";
import product5 from "@/assets/products/product-5.jpg";
import product6 from "@/assets/products/product-6.jpg";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "must-have-summer-fashion-trends-2024",
    title: "10 Must-Have Summer Fashion Trends for 2024",
    excerpt: "Discover the hottest summer trends that will elevate your wardrobe. From bold prints to sustainable fabrics, here's what you need to know.",
    content: `
Summer 2024 is all about embracing bold statements while keeping comfort at the forefront. This season, fashion takes a turn towards vibrant colors, sustainable choices, and versatile pieces that transition seamlessly from day to night.

## 1. Bold Prints Are Back

From tropical florals to geometric patterns, prints are making a major comeback this summer. Don't be afraid to mix and match different patterns for a truly unique look.

## 2. Sustainable Fabrics Take Center Stage

Eco-conscious fashion continues to dominate, with organic cotton, bamboo, and recycled materials becoming the fabrics of choice for many designers.

## 3. The Return of Maxi Dresses

Flowing maxi dresses in lightweight fabrics are perfect for the summer heat. Look for styles with interesting necklines or sleeve details to stand out.

## 4. Statement Accessories

Oversized sunglasses, chunky jewelry, and woven bags are the must-have accessories this season. These pieces can elevate even the simplest outfit.

## 5. Pastel Power

Soft pastels in lavender, mint, and baby blue are dominating the color palette. These soothing shades are perfect for hot summer days.

## 6. Athleisure Elevated

The blend of athletic and leisure wear continues to evolve, with more refined silhouettes and premium fabrics making workout clothes office-appropriate.

## 7. Cropped Everything

From blazers to cardigans, cropped versions of classic pieces are trending. They're perfect for layering and adding visual interest to your outfits.

## 8. Sheer Fabrics

Translucent materials are having a moment, adding a touch of elegance and femininity to summer wardrobes.

## 9. Platform Sandals

Comfortable yet stylish, platform sandals are the footwear of choice this summer, adding height without sacrificing comfort.

## 10. Matching Sets

Co-ord sets make getting dressed easy while looking effortlessly put-together. Look for sets in linen or cotton for maximum breathability.

---

*Stay tuned for more trend updates and style tips throughout the season!*
    `,
    image: product1,
    category: "Trends",
    author: "Fatima Rahman",
    date: "January 15, 2024",
    readTime: "5 min read",
    featured: true,
    tags: ["Summer Fashion", "Trends", "2024", "Style Guide"],
  },
  {
    id: 2,
    slug: "style-traditional-sarees-modern-events",
    title: "How to Style Traditional Sarees for Modern Events",
    excerpt: "Learn the art of styling traditional sarees with contemporary accessories for a perfect blend of classic and modern aesthetics.",
    content: `
The saree is a timeless garment that has been a symbol of grace and elegance for centuries. However, styling it for modern events requires a contemporary touch while honoring its traditional roots.

## Choosing the Right Saree

For modern events, opt for sarees in contemporary colors like pastels, metallics, or classic black. Lightweight fabrics like georgette, chiffon, or crepe drape beautifully and are easier to manage.

## The Power of the Blouse

Your blouse can make or break your saree look. Consider:
- **Off-shoulder blouses** for cocktail events
- **Crop top style** for a fusion look
- **Cape blouses** for dramatic effect
- **Shirt-style blouses** for a formal setting

## Modern Draping Techniques

Beyond the traditional Nivi drape, experiment with:
- The pant-style drape
- The dhoti style
- The lehenga drape
- The one-shoulder style

## Accessorizing Right

Keep jewelry minimal but impactful. Statement earrings with a clean neckline, or a stunning necklace with simple studs. Don't forget a chic clutch and comfortable heels.

## Hair and Makeup

A sleek bun or soft waves work beautifully with sarees. Keep makeup elegant - a bold lip or dramatic eyes, but not both.

---

*With these tips, you'll turn heads at any modern event while celebrating the beauty of traditional wear.*
    `,
    image: product2,
    category: "Style Tips",
    author: "Anika Chowdhury",
    date: "January 12, 2024",
    readTime: "7 min read",
    featured: true,
    tags: ["Saree", "Traditional Wear", "Styling Tips", "Fashion"],
  },
  {
    id: 3,
    slug: "kids-fashion-comfortable-stylish-outfits",
    title: "Kids Fashion: Comfortable Yet Stylish Outfits",
    excerpt: "Dressing your little ones in style doesn't mean compromising on comfort. Here are our top picks for kids' fashion this season.",
    content: `
When it comes to dressing children, comfort should always be the priority. But who says comfortable can't be stylish? Here's how to achieve both.

## Fabric First

Choose natural, breathable fabrics like:
- **Cotton** - soft, absorbent, and easy to wash
- **Linen** - perfect for hot weather
- **Bamboo** - gentle on sensitive skin

## Colors and Patterns

Kids love colors! Don't shy away from:
- Bright primary colors
- Fun patterns like stripes, polka dots, and animal prints
- Mix and match possibilities

## Practical Considerations

- Easy-to-pull-on pants with elastic waists
- Shirts with snap buttons for younger children
- Stretchy fabrics that allow movement
- Machine washable everything!

## Building a Capsule Wardrobe

Focus on versatile pieces:
- Neutral bottoms that go with everything
- Statement tops in fun designs
- Layer-friendly cardigans
- Comfortable, supportive shoes

---

*Remember, the best outfit for a child is one they can play, learn, and grow in comfortably!*
    `,
    image: product3,
    category: "Kids Fashion",
    author: "Nadia Islam",
    date: "January 10, 2024",
    readTime: "4 min read",
    featured: false,
    tags: ["Kids", "Children", "Comfort", "Style"],
  },
  {
    id: 4,
    slug: "ultimate-guide-mens-formal-wear",
    title: "The Ultimate Guide to Men's Formal Wear",
    excerpt: "From business meetings to wedding ceremonies, master the art of formal dressing with our comprehensive guide.",
    content: `
Formal wear for men is an art form that, when mastered, can boost confidence and make lasting impressions. Here's everything you need to know.

## Understanding Dress Codes

- **Black Tie** - Tuxedo with bow tie
- **Business Formal** - Dark suit with tie
- **Business Professional** - Suit with or without tie
- **Smart Casual** - Blazer with dress pants

## The Perfect Suit

Invest in quality suits in:
- Navy blue (most versatile)
- Charcoal gray (professional)
- Black (formal events)

Ensure proper fit - shoulders should align, sleeves should show a bit of shirt cuff.

## Shirt Selection

White and light blue are essentials. Pay attention to:
- Collar style (spread for most face shapes)
- Cuff style (French cuffs for formal)
- Fabric quality (100% cotton preferred)

## Accessories Matter

- **Ties** - Match occasion, not just outfit
- **Pocket squares** - Don't match exactly with tie
- **Cufflinks** - Subtle elegance
- **Watch** - Dress watches for formal events

## Shoes Complete the Look

- Oxford shoes for formal occasions
- Derby shoes for slightly less formal
- Loafers for smart casual
- Always match belt to shoes

---

*A well-dressed man commands attention and respect. Invest in quality pieces and proper fit.*
    `,
    image: product4,
    category: "Men's Fashion",
    author: "Rafiq Ahmed",
    date: "January 8, 2024",
    readTime: "6 min read",
    featured: false,
    tags: ["Men", "Formal Wear", "Suits", "Professional"],
  },
  {
    id: 5,
    slug: "sustainable-fashion-eco-friendly-choices",
    title: "Sustainable Fashion: Making Eco-Friendly Choices",
    excerpt: "Explore how you can build a sustainable wardrobe without sacrificing style. Tips for conscious shopping and fabric selection.",
    content: `
Fashion is one of the most polluting industries in the world. But as consumers, we have the power to make a difference through our choices.

## Why Sustainable Fashion Matters

The traditional fashion industry:
- Uses massive amounts of water
- Relies on harmful chemicals
- Contributes to landfill waste
- Often involves unfair labor practices

## Building a Sustainable Wardrobe

### Quality Over Quantity
Invest in fewer, better-made pieces that last longer. Cost-per-wear becomes minimal with quality items.

### Choose Natural Fibers
Opt for:
- Organic cotton
- Linen
- Hemp
- Tencel
- Recycled materials

### Shop Secondhand
Thrift stores, vintage shops, and online resale platforms offer unique pieces while reducing waste.

### Support Ethical Brands
Research brands that prioritize:
- Fair wages and working conditions
- Sustainable materials
- Transparent supply chains
- Environmental responsibility

## Caring for Your Clothes

Extend the life of your garments:
- Wash less frequently
- Use cold water
- Air dry when possible
- Repair instead of replace

---

*Every purchase is a vote for the kind of world you want to live in. Choose wisely.*
    `,
    image: product5,
    category: "Sustainability",
    author: "Mariam Khan",
    date: "January 5, 2024",
    readTime: "8 min read",
    featured: false,
    tags: ["Sustainable", "Eco-Friendly", "Conscious Fashion", "Environment"],
  },
  {
    id: 6,
    slug: "baby-fashion-essentials-new-parents-guide",
    title: "Baby Fashion Essentials: A New Parent's Guide",
    excerpt: "Everything you need to know about dressing your newborn. From fabric choices to seasonal considerations.",
    content: `
Dressing a baby might seem simple, but there's a lot to consider for your little one's comfort and safety.

## Fabric Guidelines

Babies have sensitive skin, so fabric choice is crucial:
- **100% Cotton** - Breathable and soft
- **Organic materials** - Free from harmful chemicals
- **Avoid** - Synthetic fabrics that trap heat

## Essential Pieces

### Newborn Must-Haves
- Bodysuits/onesies (lots of them!)
- Sleep suits/footies
- Soft hats
- Mittens (to prevent scratching)
- Swaddle blankets

### As They Grow
- Easy-change outfits
- Comfortable play clothes
- Weather-appropriate layers

## Seasonal Dressing

### Summer
- Light, breathable fabrics
- Sun hats and shade
- Short sleeves and bare feet at home

### Winter
- Layers (easier to adjust)
- Warm but not overheating
- Covered extremities

## Practical Tips

- **Snaps over buttons** - Faster diaper changes
- **Easy-on necklines** - Less struggle dressing
- **Room to grow** - Babies grow fast!
- **Safety first** - Avoid loose strings, buttons, or anything that could be a choking hazard

---

*Remember, babies care more about comfort than style. When they're comfortable, everyone's happier!*
    `,
    image: product6,
    category: "Baby Care",
    author: "Sabrina Akter",
    date: "January 3, 2024",
    readTime: "5 min read",
    featured: false,
    tags: ["Baby", "Newborn", "Essentials", "Parent Guide"],
  },
];

export const categories = ["All", "Trends", "Style Tips", "Kids Fashion", "Men's Fashion", "Sustainability", "Baby Care"];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, limit);
};
