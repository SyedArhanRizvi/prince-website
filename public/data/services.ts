import type { HeroDynamicData } from "@/features/services/components/HeroSection";
import type { SECTION_DATA as Section2Data } from "@/features/services/components/Section3";
import type { SECTION_DATA as Section3Data } from "@/features/services/components/Section2";
import type { SECTION_DATA as Section4Data } from "@/features/services/components/Section4";
import type { FAQ } from "@/features/services/components/Faqs";

export interface FaqSectionData {
  eyebrow?: string;
  title?: string;
  description?: string;
  faqs: FAQ[];
}

export interface ServicePageData {
  slug: string;
  HeroSection: HeroDynamicData;
  Section2: Section2Data;
  Section3: Section3Data;
  section4: Section4Data;
  faq: FaqSectionData;
}

export const newSofa: ServicePageData[] = [
  {
    slug: "new-sofa",
    HeroSection: {
      title:
        "Custom Sofa Manufacturer in Delhi NCR – Get Your New Sofa Designed Your Way",
      description:
        "Get premium-quality custom sofas in Delhi NCR, designed to match your home's style, comfort, and space requirements. Whether you need a modern sofa set, L-shaped sofa, 3-seater sofa, or a completely customized design, we create sofas using quality materials, durable frames, and comfortable cushioning. Choose your preferred fabric, colour, size, and design to get a sofa that perfectly complements your living room.",
      backgroundImage: "/services/new-sofa/hero.jpg",
      backgroundAlt:
        "Custom-made modern sofa in a stylish Delhi NCR living room",
    },
    Section2: {
      eyebrow: "SOFAS by ElaaInteriors",
      h2_title: "Modern and sophisticated sofas in Delhi NCR",
      para: "ElaaInteriors provides a wide variety of modern and quality sofas available in Delhi NCR. Our range includes L-shape sofas, large sectionals along with 2 and 3 seater sofas. You can select from various fabric and colour options and modern designs to ensure that you are able to find the ideal sofa to suit your home. Additionally, you will also be able to choose from a variety of seat cushion styles for optimum levels of comfort.",
      cards: [
        {
          id: 1,
          title: "Chesterfield Sofa Designs",
          para: "Explore timeless Chesterfield sofa designs featuring deep button tufting, elegant rolled arms, and premium upholstery. These sofas bring classic sophistication and comfortable seating to modern and traditional homes across Delhi NCR.",
          imageSrc: "/services/new-sofa/chesterfield-sofa.jpg",
          tag: "Custom Build",
        },
        {
          id: 2,
          title: "Premium Leather Sofas",
          para: "Enhance your living room with premium leather sofas that combine refined aesthetics with everyday comfort. Choose from different colours, finishes, and seating arrangements to complement your home interiors.",
          imageSrc: "/services/new-sofa/leather-sofa.jpg",
          tag: "Custom Build",
        },
        {
          id: 3,
          title: "Outdoor Sofas for Gardens & Patios",
          para: "Create a relaxing outdoor space with stylish outdoor sofas designed for balconies, terraces, gardens, and patios. Explore comfortable seating options that complement your outdoor surroundings while offering practical functionality.",
          imageSrc: "/services/new-sofa/outdoor-sofa.jpg",
          tag: "Outdoor",
        },
        {
          id: 4,
          title: "Comfortable Recliner Sofas",
          para: "Experience superior relaxation with comfortable recliner sofas designed for everyday lounging. Featuring adjustable reclining positions, supportive cushioning, and attractive upholstery, these sofas make a perfect addition to modern living spaces.",
          imageSrc: "/services/new-sofa/recliner-sofa.jpg",
          tag: "Custom Build",
        },
        {
          id: 5,
          title: "Modern Sofa Sets for Living Rooms",
          para: "Discover elegant sofa sets featuring coordinated seating arrangements, including 2-seater and 3-seater sofas. ElaaInteriors offers a variety of modern sofa styles to create a welcoming and well-designed living room.",
          imageSrc: "/services/new-sofa/modern-sofa-set.jpg",
          tag: "Custom Build",
        },
        {
          id: 6,
          title: "L-Shaped Sofas & Sectional Couches",
          para: "Make the most of your living space with stylish L-shaped sofas and sectional couches. Designed to provide generous seating, these sofas are ideal for spacious living rooms, family areas, and contemporary apartments.",
          imageSrc: "/services/new-sofa/l-shape-sofa.jpg",
          tag: "Sectional",
        },
        {
          id: 7,
          title: "Stylish 2-Seater & 3-Seater Sofas",
          para: "Find comfortable 2-seater and 3-seater sofas suited to different room sizes and seating requirements. From compact apartment furniture to spacious family seating, explore attractive designs with comfortable cushioning and quality upholstery.",
          imageSrc: "/services/new-sofa/two-three-seater-sofa.jpg",
          tag: "Custom Build",
        },
        {
          id: 8,
          title: "Space-Saving Sofa Beds & Sofa-Cum-Beds",
          para: "Maximise your available space with versatile sofa beds that transform into comfortable sleeping arrangements whenever needed. Ideal for guest rooms and compact apartments, these designs combine practical functionality with modern styling.",
          imageSrc: "/services/new-sofa/sofa-cum-bed.jpg",
          tag: "Multi-Use",
        },
        {
          id: 9,
          title: "Modern Straight-Line & Carved Wooden Sofas",
          para: "Explore modern straight-line sofas featuring clean silhouettes alongside beautifully carved wooden sofas showcasing detailed craftsmanship. Complete your living room arrangement with a coordinating sofa table for a sophisticated interior.",
          imageSrc: "/services/new-sofa/wooden-carved-sofa.jpg",
          tag: "Artisan Wood",
        },
      ],
    },
    Section3: {
      eyebrow: "Why choose us?",
      h2_title: "Why choose us for Sofa Making in Delhi NCR?",
      para: "At ElaaInteriors, we strongly believe that people require personalised furniture. We can offer on-site or off-site options for sofas. In addition, we are able to present a range of fabrics, foams and upholstery so that you may select what is most suitable. Our attention to detail, in conjunction with high quality resources, ensures that our sofas are comfortable and long lasting.",
      imageSrc: "/services/new-sofa/why-choose-us.jpg",
      imageTitleandAlt:
        "Master craftsman tailoring a custom sofa with premium fabric and high-density foam",
      ctaLabel: "Contact now",
      ctaHref: "/contact-us",
    },
    section4: {
      eyebrow: "QUALITY ASSURANCE BY ELAAINTERIORS",
      h2_title:
        "Enjoy Lasting Quality with Our 5-Year Sofa Manufacturing Guarantee",
      para: "We are confident about the quality of our new sofa production. Our range includes a 5 year guarantee for the wooden frame, fabric, foam and labour. We aim to produce sofas which are suitable for regular use. This demonstrates our dedication to quality products and good quality labour so that people living within Delhi NCR can continue to enjoy good quality furniture.",
      materials: [
        {
          id: "wooden-frame",
          title: "Wooden Frame Guarantee",
          para: "Our sofas have quality wood frames. These are produced with care so that they are strong and can effectively support the rest of the sofa.",
          imageSrc: "/services/new-sofa/guarantee-wood.jpg",
          imageAlt: "Seasoned hardwood sofa frame built for lasting strength",
          highlights: ["Seasoned hardwood", "Reinforced joints", "5-year cover"],
        },
        {
          id: "upholstery-fabric",
          title: "Upholstery Fabric Guarantee",
          para: "We select high quality, aesthetically pleasing and suitable fabrics for our sofas so that your furniture continues to both look and feel good.",
          imageSrc: "/services/new-sofa/guarantee-fabric.jpg",
          imageAlt: "Premium upholstery fabric swatches and textured weaves",
          highlights: ["Fade-resistant", "Rich textures", "5-year cover"],
        },
        {
          id: "foam-cushioning",
          title: "Foam & Cushioning Guarantee",
          para: "Get comfortable seating with quality foam cushioning selected to provide proper support and a pleasant seating experience for everyday relaxation.",
          imageSrc: "/services/new-sofa/guarantee-foam.jpg",
          imageAlt: "High-density cushioning foam for long-lasting sofa comfort",
          highlights: ["High-density support", "Retains shape", "5-year cover"],
        },
        {
          id: "manufacturing-labour",
          title: "Manufacturing & Labour Guarantee",
          para: "Our labour force take great care during the process of producing and then upholstering and sewing sofas so that good quality end products can be achieved.",
          imageSrc: "/services/new-sofa/guarantee-labour.jpg",
          imageAlt: "Skilled upholsterer stitching and finishing a custom sofa",
          highlights: ["Precision stitching", "Expert craftsmanship", "5-year cover"],
        },
      ],
      guarantee: {
        value: "5",
        unit: "Years",
        label: "Guarantee",
        note: "Includes a 5-year guarantee covering the wooden frame, upholstery fabric, foam cushioning, and labour across Delhi NCR.",
      },
      ctaLabel: "Contact now",
      ctaHref: "/contact-us",
    },
    faq: {
      eyebrow: "FAQs",
      title: "FAQs On Delhi NCR New Sofa Manufacturing",
      faqs: [
        {
          id: 1,
          question: "Where can I get custom sofas manufactured?",
          answer:
            "We at ElaaInteriors manufacture new sofas in Delhi NCR. We are able to tailor-make a sofa to cater for your desired style, size, colour and comfort. We can produce a whole new sofa set, L section sofa, sectionals and 3 seater sofas. We utilise high quality materials and take care in our production methods.",
        },
        {
          id: 2,
          question: "How much does it cost to manufacture a custom sofa?",
          answer:
            "Prices for newly-manufactured sofas can vary in Delhi NCR depending on the sofa size, style, type of wood, foam and fabric and finishing. Prices will vary for 2, 3 and L-section sofas. Please speak to our team at ElaaInteriors who will advise you on appropriate materials and then provide a bespoke quote.",
        },
        {
          id: 3,
          question:
            "Can I manufacture a sofa to my room specification and style?",
          answer:
            "Yes. We can manufacture sofas to match your specific needs and style. In conjunction with you, we can assess and agree upon the size, seating format and fabric, colour and comfort of a sofa which will blend well within your living room. This can be especially beneficial if off-the-peg sofas are not an appropriate size for your room.",
        },
        {
          id: 4,
          question: "Does ElaaInteriors manufacture new sofas on-site?",
          answer:
            "Yes. We can manufacture new sofas either on-site or within our workshop. Which method is most appropriate can be discussed with our team and then production will proceed accordingly.",
        },
        {
          id: 5,
          question:
            "Can I specify the fabric, foam and upholstery used to manufacture my sofa?",
          answer:
            "Yes. Our team are happy to advise you on the range of foams, fabrics and upholstery which can be utilised to manufacture a new sofa. By assessing these, together with our guidance, you can determine which materials would most appropriately meet your needs and preferences in relation to appearance and comfort.",
        },
        {
          id: 6,
          question:
            "What styles of new sofa can be manufactured by ElaaInteriors?",
          answer:
            "We can manufacture a wide range of new sofas. These include Chesterfield and luxury leather sofas together with reclining, outdoor, contemporary, L section, sectionals, 2 and 3 seater sofas, sofa beds and wooden carved sofas. Our team can advise you on which style of sofa is appropriate for you having taken into account your favoured style, seating format and material options.",
        },
        {
          id: 7,
          question:
            "Can ElaaInteriors manufacture L-section and sectionals for my modern living room?",
          answer:
            "Yes. L-Section and sectionals can be an ideal choice for a modern living room where large and comfortable seating is needed. Our team can analyse and establish the appropriate sofa size, seating pattern, fabric and foam for a sofa which is in keeping with your living room and style.",
        },
        {
          id: 8,
          question:
            "Which new sofa is most appropriate for my small living room – 2 seater, 3 seater or sofa bed?",
          answer:
            "This will depend on your available floor area and seating needs. A 2 seater can be a good solution for a small living room. A 3 seater will offer more seats. Alternatively, a sofa bed can be a good option if you also require extra guest accommodation. Our team can advise you on which new sofa style is likely to be most appropriate for you and your home.",
        },
        {
          id: 9,
          question: "What materials are used in new sofa manufacture?",
          answer:
            "A new sofa is constructed using various materials such as wood, foam and fabric. These will influence the sofa’s form, comfort and visual appeal. Our team are happy to advise you on available materials so that you can identify which would best meet your aesthetic and functional needs.",
        },
        {
          id: 10,
          question:
            "Does ElaaInteriors manufacture new sofas in Noida, Greater Noida and Ghaziabad?",
          answer:
            "Our clients in Noida, Greater Noida and Ghaziabad can all benefit from our new sofa manufacturing expertise. Having established your desired sofa style, material and manufacture needs, our team can advise you which on-site and/or workshop-based production option is available for your area.",
        },
        {
          id: 11,
          question:
            "Does ElaaInteriors manufacture new sofas in Delhi and Gurugram?",
          answer:
            "Yes. In addition to providing new sofa manufacture throughout Delhi NCR, we also service clients from Delhi and Gurugram. Whether you wish to manufacture a contemporary new sofa set, luxury leather sofa, L-section or tailor-made new sofa, our team can advise you.",
        },
        {
          id: 12,
          question:
            "Does ElaaInteriors offer a warranty for new manufactured sofas?",
          answer:
            "Yes. Our 5 year warranty for newly manufactured sofas includes the wood, fabric, foam and labour. This is detailed within our warranty policy and again demonstrates our commitment to quality materials and expert production methods. Prior to placing an order, clients are advised to examine the relevant warranty details and scope.",
        },
        {
          id: 13,
          question: "How do I decide on a suitable new sofa?",
          answer:
            "You should consider your living room size and seating needs and also evaluate the style, colour, fabric and comfort of a sofa. For instance, L-section sofas are appropriate for larger seating areas whereas a 2 seater can be an appropriate choice for smaller rooms. Our team can guide you in identifying which new sofa style and materials are likely to be most appropriate for your home.",
        },
        {
          id: 14,
          question:
            "Why should I use ElaaInteriors for new sofa manufacture?",
          answer:
            "With over 15 years’ experience in furniture making and repair, together with interior expertise, we at ElaaInteriors can both manufacture new sofas on-site and within our workshop. We can also advise you on fabric, foam and upholstery materials. Furthermore, we pay great attention to the quality of our production methods. Our objective is to manufacture high quality, comfortable new sofas which are in line with your home, style and needs.",
        },
      ],
    },
  },
  {
    slug: "new-bed",
    HeroSection: {
      title:
        "Custom Bed Manufacturer in Delhi NCR – Get a Bed Designed for Your Bedroom",
      description:
        "ELAAINTERIORS specialises in the new manufacturing of beds. We tailor beds to fit your bedroom in terms of size, type and storage facility. This includes wooden beds, queen and king size beds and even beds which include a stylish headboard and storage facilities. We can advise you on these so that you can then select the ideal bed to enhance and suit your bedroom environment.",
      backgroundImage: "/services/new-bed/hero.jpg",
      backgroundAlt:
        "Custom-made wooden bed with upholstered headboard in a modern Delhi NCR bedroom",
    },
    Section2: {
      eyebrow: "BEDS BY ELAAINTERIORS",
      h2_title: "Stylish and Functional Bed Manufacturing for Modern Bedrooms",
      para: "As well as aesthetically enhancing a bedroom, it is also important that your bed is functional and fits well within the room. ElaaInteriors specialises in the new manufacturing of beds. We can produce beds of various sizes, in wood and including storage and/or design headboards. Talk to our team at ElaaInteriors to advise on the best bed for you, including size, frame type and colour/finish.",
      cards: [
        {
          id: 1,
          title: "King Size Wood Bed",
          para: "Create a large and cosy bedroom environment using a beautifully designed king sized wooden bed. As well as being large, these beds can be personalised with your favourite headboard design and finish and can also include storage facilities. Functionality and visual impact can successfully be combined with this bed type.",
          imageSrc: "/services/new-bed/king-size-wood-bed.jpg",
          tag: "Custom Build",
        },
        {
          id: 2,
          title: "Queen Size Bed",
          para: "Utilise and enhance your bedroom by furnishing it with a contemporary queen sized bed. Queen beds are often used in both master bedrooms and guest bedrooms and can effectively be both functional and visually pleasing. There are numerous wood, headboard and finish options that can be explored and matched to your bedroom.",
          imageSrc: "/services/new-bed/queen-size-bed.jpg",
          tag: "Custom Build",
        },
        {
          id: 3,
          title: "Double Bed",
          para: "Double beds can be manufactured to be both functional and visually appealing. ElaaInteriors can advise you on the most suitable design and frame type. You can opt for either a basic wooden double bed or a more ornate version. Double beds are appropriate for those wanting to equally emphasise function and visual appeal within their bedroom.",
          imageSrc: "/services/new-bed/double-bed.jpg",
          tag: "Custom Build",
        },
        {
          id: 4,
          title: "Hydraulic Storage Bed",
          para: "Optimise the space within your bedroom with a hydraulic storage bed. This enables you to lift the section of the bed which holds the mattress, to then gain access to the bed storage area. Extra bedding and other household items can thus be stored. Our team can advise on the best headboard and storage design and facilities for your bedroom.",
          imageSrc: "/services/new-bed/hydraulic-storage-bed.jpg",
          tag: "Storage",
        },
        {
          id: 5,
          title: "Wooden Box Bed",
          para: "A wooden box bed is a good way of storing bedroom items including seasonal bedding. As it contains the storage space within the bed itself, further storage furniture is not necessary. Talk to our team at ElaaInteriors about the most suitable bed size and design and finish to match your bedroom.",
          imageSrc: "/services/new-bed/wooden-box-bed.jpg",
          tag: "Storage",
        },
        {
          id: 6,
          title: "Drawer Storage Bed",
          para: "A bed with integrated drawers is a convenient method of storage. Our team can advise you on the best drawer design for your bedroom. Discussions can also be had regarding the bed size and design. This is dependent upon the design and bedroom environment.",
          imageSrc: "/services/new-bed/drawer-storage-bed.jpg",
          tag: "Storage",
        },
        {
          id: 7,
          title: "Upholstered and Designer Headboard Bed",
          para: "Enhance the softness and sophistication of your bedroom with an upholstered bed and designer headboard. There is a wide variety of headboard designs, fabrics and colours. Select a design which can be paired with your bedroom environment, whether you favour a minimalistic or more elaborately padded style.",
          imageSrc: "/services/new-bed/upholstered-headboard-bed.jpg",
          tag: "Designer",
        },
        {
          id: 8,
          title: "Contemporary Wooden Bed",
          para: "Furnish your bedroom in a modern manner using contemporary wooden beds. These can range from minimalist and straight-edged beds to more intricately designed variations. Following discussion regarding the desired bed size and finish, our team can advise on the most appropriate design for your bedroom environment. These can suit modern apartments, as well as families and well thought out bedrooms.",
          imageSrc: "/services/new-bed/contemporary-wooden-bed.jpg",
          tag: "Modern",
        },
        {
          id: 9,
          title: "Traditional and Ornate Wooden Bed",
          para: "Introduce traditional artisanship into your bedroom by selecting a traditional wooden bed with ornate elements. This bed type is appropriate for homeowners who wish to add a more classic and unique feel to their furniture. Our team can advise on the best design and finish for your bedroom furnishings and environment.",
          imageSrc: "/services/new-bed/traditional-wooden-bed.jpg",
          tag: "Artisan Wood",
        },
      ],
    },
    Section3: {
      eyebrow: "WHY CHOOSE US?",
      h2_title: "Why Choose ElaaInteriors for Bed Manufacturing in Delhi NCR?",
      para: "We believe that bedroom furniture should be personalised and not restricted to generic styles. Following discussion regarding your ideal bed type, bedroom size and storage and finish needs, we can then manufacture your bed. On-site and/or workshop based manufacturing can also be discussed depending on your specific requirements. Where relevant, our team can advise on the most suitable materials, finish and fabric for your bed so that you can decide on the most fitting option. We place emphasis on our high quality, skilled manufacturing so that we can supply you with aesthetically pleasing and functional bedroom furniture.",
      imageSrc: "/services/new-bed/why-choose-us.jpg",
      imageTitleandAlt:
        "Skilled carpenter crafting a custom wooden bed frame with storage in the workshop",
      ctaLabel: "Contact now",
      ctaHref: "/contact-us",
    },
    section4: {
      eyebrow: "QUALITY MATERIALS & CRAFTSMANSHIP",
      h2_title: "Carefully Crafted Beds with Attention to Every Detail",
      para: "Good quality beds will include good quality and appropriate materials, and will be both functional and visually appealing. Our team discusses frame, mattress support, headboard, storage and finish options for your new bed based on your chosen design and requirements. We endeavour to both functionally and visually enhance your bedroom through our furniture.",
      materials: [
        {
          id: "bed-frame-support",
          title: "Bed Frame & Support Structure",
          para: "The bed frame is fundamental to bed construction. We are mindful of the correct method of manufacture and assembly so that the frame can robustly support the mattress. Appropriate materials can also be discussed.",
          imageSrc: "/services/new-bed/quality-frame.jpg",
          imageAlt: "Heavy-duty wooden bed frame and mattress support structure",
          highlights: ["Seasoned timber", "Robust mattress support", "Precision joinery"],
        },
        {
          id: "storage-mechanism",
          title: "Storage & Storage Mechanism",
          para: "For beds which include storage, both the storage system and mechanism are important. Hydraulic, box and drawer style storage can all be explored. Our team can advise on the most appropriate storage and mechanism for your bedroom.",
          imageSrc: "/services/new-bed/quality-storage.jpg",
          imageAlt: "Smooth hydraulic lift mechanism and spacious under-bed storage",
          highlights: ["Hydraulic lift", "Box & drawer options", "Smooth operation"],
        },
        {
          id: "headboard-finish",
          title: "Headboard & Finish",
          para: "As previously mentioned, the headboard is an essential element of a bed. We can advise on wood and upholstery headboard options, as well as colours, fabrics and finishes so that your bed can be matched to your bedroom environment.",
          imageSrc: "/services/new-bed/quality-headboard.jpg",
          imageAlt: "Custom upholstered and polished wooden headboard finishes",
          highlights: ["Wood & fabric styles", "Custom colours", "Tailored textures"],
        },
        {
          id: "manufacturing-finishing",
          title: "Manufacturing & Finishing",
          para: "Precise manufacturing, fitting and finishing all contribute to the visual appeal of a bed. Our highly skilled manufacturing process allows us to supply you with visually pleasing furniture which can be matched to your discussed design.",
          imageSrc: "/services/new-bed/quality-finishing.jpg",
          imageAlt: "Hand-finished polish and fine detailing on a custom wooden bed",
          highlights: ["Clean edge detailing", "Smooth polish", "Workshop & on-site"],
        },
      ],
      guarantee: {
        value: "5",
        unit: "Years",
        label: "Guarantee",
        note: "Backed by ElaaInteriors' quality assurance across structural framing, storage hardware, and craftsmanship.",
      },
      ctaLabel: "Contact now",
      ctaHref: "/contact-us",
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Commonly Asked Questions Regarding New Bed Manufacturing in Delhi NCR",
      faqs: [
        {
          id: 1,
          question: "Where can I source a personal bed manufacturer in Delhi NCR?",
          answer:
            "ElaaInteriors specialises in new bed manufacturing and can advise you on the most appropriate bed for your bedroom. Discussing your favoured bed type, size, material, finish, headboard and storage needs with our team will enable you to select an appropriate bed for your home. We can advise on a number of bed variations such as king, queen and double beds as well as storage beds.",
        },
        {
          id: 2,
          question: "What is the cost of a new bespoke bed in Delhi NCR?",
          answer:
            "Various factors will affect the cost of a new bespoke bed. For example, bed size, type, frame material, storage and headboard design and finish can all influence cost. Even within the same bed type (for example, double, king size wooden and hydraulic storage beds) there can be differing costs, due to variations in manufacturing. Discuss your favoured bed design and requirements with our team so that we can advise you on available materials and then provide you with a tailored quotation.",
        },
        {
          id: 3,
          question: "Can beds be manufactured to precisely fit my bedroom?",
          answer:
            "Yes. Our team can discuss your bedroom size and favoured bed size. Beds can then be manufactured to fit well within your bedroom, taking into account the available floor area, mattress size and storage needs. This is particularly beneficial if neither standard bed sizes nor off-the-shelf beds are suited to your bedroom.",
        },
        {
          id: 4,
          question: "Which bed types can be manufactured by ElaaInteriors?",
          answer:
            "Our team can advise you on a variety of bed types including king, queen and double beds, hydraulic, wooden box, drawer, upholstered and designer wooden beds. Again, following discussion of your bedroom size and favoured finish, we can advise on the most appropriate bed design for you.",
        },
        {
          id: 5,
          question: "Can ElaaInteriors manufacture king and queen sized beds?",
          answer:
            "Yes. King and queen beds are commonly used within master bedrooms and other large sleeping areas. Our team can advise you on mattress size, frame type, headboard and storage needs. We can then advise on the most appropriate bed design for your bedroom, taking into account your bedroom environment and requirements.",
        },
        {
          id: 6,
          question:
            "Is it possible to manufacture a hydraulic storage bed in Delhi NCR?",
          answer:
            "Yes, it is possible and our team can advise you on hydraulic storage bed options, based on your bedroom size and storage needs. Hydraulic beds operate via a mechanism which lifts the mattress support section, so that the bed storage area can be accessed. Consideration should be given to bedroom space, storage capacity, mechanism and bed size when determining the most suitable design.",
        },
        {
          id: 7,
          question:
            "What is the difference between a hydraulic bed and wooden box bed?",
          answer:
            "Whilst a hydraulic bed operates via a mechanism to lift the mattress support so that the bed's storage area can be accessed, typically a wooden box bed has a static storage area which can be accessed via a specifically designed aperture or structure. The most appropriate bed type will relate to your storage access frequency, bedroom and personal preferences.",
        },
        {
          id: 8,
          question: "Can I specify the wood type and finish for my new bed?",
          answer:
            "Yes. Our team can advise you on the most appropriate wood and finish for your bed. Both the wood type and finish can affect both the appearance and manufacturing of a bed. Our team can advise you on these options to best match your favoured bed design, budget and bedroom environment.",
        },
        {
          id: 9,
          question: "Can I tailor my bed's headboard design?",
          answer:
            "Yes. Our team can advise you on a range of headboard options, which can include basic wooden, ornate and upholstered versions. Depending on your favoured headboard design, we can advise on shape, pattern, colour and fabric options so that your bedroom can be furnished to best reflect your personal style.",
        },
        {
          id: 10,
          question: "Can beds be manufactured both on-site and in a workshop?",
          answer:
            "Manufacturing location can be discussed with our team following discussion regarding your favoured bed design and requirements. Manufacturing can either be carried out on-site or within a workshop and this may depend on design intricacy, available workspace and environmental factors. Please contact our team to determine the most appropriate manufacturing location for you.",
        },
        {
          id: 11,
          question: "How long does it take to manufacture a new bed?",
          answer:
            "Bed manufacturing time will vary, and can be affected by a number of factors. These include bed size, design intricacy, materials and storage. Simpler bed designs may take a differing amount of time to manufacture to more intricately designed beds (for example, upholstered and/or storage beds). Following discussion of your requirements and confirmation of your favoured bed design, our team can advise you on approximate manufacturing duration.",
        },
        {
          id: 12,
          question:
            "Does ElaaInteriors manufacture new beds in Noida, Greater Noida and Ghaziabad?",
          answer:
            "As well as catering for furniture needs throughout Delhi NCR, ElaaInteriors can also advise you on new bed manufacturing in Noida, Greater Noida and Ghaziabad. Discussing your favoured bed size, type, storage and material with our team will allow you to advise you on available manufacturing options for your region.",
        },
        {
          id: 13,
          question: "Can new wooden beds be manufactured in Delhi and Gurugram?",
          answer:
            "Those in both Delhi and Gurugram can contact ElaaInteriors to discuss new bed manufacturing. Whether you want a modern wooden, king, queen or storage bed, our team can advise you on the most suitable bed for your bedroom, following discussion of your bedroom size and preferences.",
        },
        {
          id: 14,
          question:
            "Does ElaaInteriors supply a warranty or guarantee for newly manufactured beds?",
          answer:
            "Depending on your favoured bed design, materials and components, an applicable warranty/guarantee may be in place. Please contact our team prior to ordering so that you can ascertain warranty/guarantee details, including duration and conditions. Ensure that you are fully aware of the extent of, and conditions for, your bed's warranty/guarantee.",
        },
      ],
    },
  },
  {
    slug: "new-highback-chair",
    HeroSection: {
      title:
        "High Back Chair Manufacturer in Delhi NCR – Designed for Comfort & Style",
      description:
        "Give your living space a more elegant and comfortable look with beautifully crafted high back chairs in Delhi NCR. At ElaaInteriors, we offer new high back chair manufacturing with different designs, wooden frames, upholstery and cushioning options. Whether you prefer a classic wingback chair, a modern upholstered armchair, a stylish wooden high back chair or a statement accent chair, we help you explore designs that complement your interiors. Choose your preferred fabric, colour and finish to create a chair that suits your space and personal style.",
      backgroundImage: "/services/new-highback-chair/hero.jpg",
      backgroundAlt:
        "Custom-crafted high back armchair in a stylish Delhi NCR living room",
    },
    Section2: {
      eyebrow: "HIGH BACK CHAIRS BY ELAAINTERIORS",
      h2_title: "Elegant High Back Chair Designs for Modern Living Spaces",
      para: "A well-designed high back chair can add character, comfortable seating and a distinctive touch to your interiors. ElaaInteriors offers different high back chair styles for living rooms, bedrooms, reading corners and other indoor spaces. From upholstered armchairs and classic wingback designs to modern wooden high back chairs, you can explore different frame styles, fabric options, colours and cushioning preferences. Discuss your requirements with our team to find a design that complements your home.",
      cards: [
        {
          id: 1,
          title: "Upholstered High Back Armchairs",
          para: "Add comfort and sophistication to your interiors with upholstered high back armchairs. Featuring a tall backrest, cushioned seating and attractive fabric finishes, these chairs can complement living rooms, bedrooms and personal seating areas. Explore different upholstery colours, textures and designs to create a chair that matches your home interiors.",
          imageSrc: "/services/new-highback-chair/upholstered-armchair.jpg",
          tag: "Custom Build",
        },
        {
          id: 2,
          title: "Wooden High Back Chairs",
          para: "Bring timeless craftsmanship into your home with wooden high back chairs designed to combine an elegant appearance with practical seating. Explore different wooden frame styles, armrest designs and finishing options according to your preferences. From simple contemporary designs to more traditional furniture styles, choose a high back wooden chair that complements your living space.",
          imageSrc: "/services/new-highback-chair/wooden-highback-chair.jpg",
          tag: "Artisan Wood",
        },
        {
          id: 3,
          title: "Classic Wingback Chairs",
          para: "Create a distinctive seating corner with a classic wingback chair featuring an extended backrest and characteristic side wings. These chairs bring a traditional yet sophisticated appearance to living rooms, bedrooms and reading areas. Choose suitable upholstery fabrics, colours and finishing details to complement classic or contemporary interiors.",
          imageSrc: "/services/new-highback-chair/wingback-chair.jpg",
          tag: "Classic",
        },
        {
          id: 4,
          title: "Tufted & Designer High Back Chairs",
          para: "Make a style statement with designer high back chairs featuring decorative tufting, detailed upholstery and attractive backrest designs. Explore button-tufted and other upholstered styles with different fabric textures and colour combinations. These chairs can add visual interest to living rooms, lounge areas and thoughtfully designed bedroom interiors.",
          imageSrc: "/services/new-highback-chair/tufted-designer-chair.jpg",
          tag: "Designer",
        },
        {
          id: 5,
          title: "High Back Accent & Lounge Chairs",
          para: "Create a comfortable personal seating space with high back accent and lounge chairs. Whether placed beside a sofa, near a window or in a bedroom reading corner, these chairs can add both functionality and visual appeal. Explore suitable seat cushioning, backrest styles and upholstery options to complement your available space.",
          imageSrc: "/services/new-highback-chair/accent-lounge-chair.jpg",
          tag: "Accent",
        },
      ],
    },
    Section3: {
      eyebrow: "WHY CHOOSE US?",
      h2_title:
        "Why Choose ElaaInteriors for High Back Chair Manufacturing in Delhi NCR?",
      para: "At ElaaInteriors, we believe that comfortable furniture should also reflect your personal style and interior preferences. We offer personalised high back chair manufacturing according to your preferred design, frame style, dimensions, upholstery and cushioning requirements. Depending on your project, you can discuss on-site or workshop-based manufacturing options with our team. We also present available fabric, foam and upholstery choices so that you can compare the options before making your selection. Our attention to material selection, craftsmanship and finishing helps us create high back chairs that complement your home and everyday seating needs.",
      imageSrc: "/services/new-highback-chair/why-choose-us.jpg",
      imageTitleandAlt:
        "Craftsman upholstering a custom high back chair frame in the workshop",
      ctaLabel: "Contact Now",
      ctaHref: "/contact-us",
    },
    section4: {
      eyebrow: "QUALITY ASSURANCE BY ELAAINTERIORS",
      h2_title:
        "Crafted with Care for Lasting Comfort and Elegant Finishing",
      para: "A well-made high back chair requires more than an attractive design. Its frame, seat cushioning, backrest support and upholstery all contribute to the overall seating experience and final appearance. At ElaaInteriors, we focus on these important details while manufacturing your chair according to the selected design and requirements. From the chair structure and cushioning to fabric selection and finishing, we help you explore suitable options to create comfortable and visually appealing furniture for your home.",
      materials: [
        {
          id: "chair-frame-support",
          title: "Chair Frame & Structural Support",
          para: "The frame provides the foundation of a high back chair and supports its seat, backrest and armrests. We focus on suitable frame construction and careful assembly to create a stable chair structure. Available frame material and design options can be discussed according to your preferences.",
          imageSrc: "/services/new-highback-chair/quality-frame.jpg",
          imageAlt: "Solid wooden high back chair frame and structural joints",
          highlights: ["Stable structure", "Seasoned wood", "Custom dimensions"],
        },
        {
          id: "seat-back-cushioning",
          title: "Seat & Back Cushioning",
          para: "Comfortable seating depends on appropriate cushioning for both the seat and backrest. Explore available foam and cushioning options according to your preferred seating feel and design. The aim is to create a pleasant seating experience while maintaining the intended shape and appearance of the chair.",
          imageSrc: "/services/new-highback-chair/quality-cushioning.jpg",
          imageAlt: "Ergonomic seat and tall backrest foam cushioning",
          highlights: ["Ergonomic back support", "High-density foam", "Holds shape"],
        },
        {
          id: "fabric-upholstery",
          title: "Fabric & Upholstery Selection",
          para: "Upholstery plays an important role in the overall look and feel of a high back chair. Choose from available fabric colours, textures and upholstery styles to complement your furniture and interior theme. Our team can present suitable material options before manufacturing.",
          imageSrc: "/services/new-highback-chair/quality-fabric.jpg",
          imageAlt: "Curated upholstery fabric swatches for high back chairs",
          highlights: ["Rich textures", "Wide colour range", "Durable weaves"],
        },
        {
          id: "stitching-finishing",
          title: "Stitching & Final Finishing",
          para: "Careful upholstery fitting, stitching and finishing contribute to the overall appearance of a high back chair. From the backrest detailing to the seat and armrest finish, we focus on manufacturing workmanship and the details that give your furniture a neat and well-finished look.",
          imageSrc: "/services/new-highback-chair/quality-finishing.jpg",
          imageAlt: "Precision stitching and detailed armrest finishing on a high back chair",
          highlights: ["Clean tailoring", "Detailed armrests", "Refined polish"],
        },
      ],
      guarantee: {
        value: "5",
        unit: "Years",
        label: "Guarantee",
        note: "Backed by ElaaInteriors' quality assurance across frame construction, cushioning, upholstery, and workmanship.",
      },
      ctaLabel: "Discuss Your Chair Requirements",
      ctaHref: "/contact-us",
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title:
        "Common Questions About New High Back Chair Manufacturing in Delhi NCR",
      faqs: [
        {
          id: 1,
          question:
            "Where can I find a high back chair manufacturer in Delhi NCR?",
          answer:
            "ElaaInteriors offers new high back chair manufacturing services for customers looking for personalised residential furniture in Delhi NCR. You can discuss your preferred chair design, frame style, upholstery, fabric, colour and cushioning requirements with our team. Whether you need a wooden high back chair, upholstered armchair or classic wingback chair, we help you explore suitable options for your home.",
        },
        {
          id: 2,
          question: "How much does a custom high back chair cost in Delhi NCR?",
          answer:
            "The cost of a custom high back chair depends on its design, dimensions, frame material, upholstery fabric, cushioning and finishing requirements. A simple wooden high back chair may have different manufacturing costs from a detailed upholstered or tufted wingback chair. Contact ElaaInteriors with your preferred design and requirements to discuss suitable materials and receive a personalised quotation.",
        },
        {
          id: 3,
          question:
            "Can I get a high back chair manufactured according to my preferred design?",
          answer:
            "Yes. You can discuss your preferred high back chair design with ElaaInteriors before manufacturing. Options such as the backrest shape, armrests, chair dimensions, upholstery, fabric colour and finishing can be considered according to the selected design. This allows you to explore a chair that complements your furniture and available space.",
        },
        {
          id: 4,
          question:
            "What types of high back chairs can ElaaInteriors manufacture?",
          answer:
            "You can explore different residential high back chair designs, including upholstered high back armchairs, wooden high back chairs, classic wingback chairs, tufted designer chairs and high back accent or lounge chairs. Our team can help you discuss suitable frame, cushioning and upholstery options according to your preferences.",
        },
        {
          id: 5,
          question:
            "What is the difference between a high back chair and a wingback chair?",
          answer:
            "A high back chair generally refers to a chair with a taller backrest, while a wingback chair has additional side panels or wings extending from the backrest. Wingback chairs commonly feature a classic design and upholstered seating, whereas high back chairs are available in several modern and traditional styles. Your choice depends on your preferred appearance and seating requirements.",
        },
        {
          id: 6,
          question:
            "Can I choose the fabric, colour and upholstery for my high back chair?",
          answer:
            "Yes. ElaaInteriors allows customers to explore available fabric and upholstery options before selecting the final design. You can discuss different colours, textures and fabric styles with our team to find an option that complements your sofa, furniture and overall room interiors.",
        },
        {
          id: 7,
          question:
            "What materials are used in high back chair manufacturing?",
          answer:
            "High back chair manufacturing generally involves a supporting frame, seat and back cushioning, upholstery fabric and finishing materials. The selected materials can influence the chair's construction, appearance and seating experience. At ElaaInteriors, you can discuss available frame, foam and upholstery options before confirming your chair design.",
        },
        {
          id: 8,
          question:
            "Can I get a wooden high back chair with cushioned seating?",
          answer:
            "Yes. You can discuss wooden high back chair designs with cushioned seats and upholstered backrests according to your preferences. Depending on the selected style, you can explore different frame finishes, cushion materials, upholstery fabrics and colours to create a suitable chair for your living room or bedroom.",
        },
        {
          id: 9,
          question:
            "Are high back chairs suitable for living rooms and bedrooms?",
          answer:
            "Yes. High back chairs can be used in living rooms, bedrooms, reading corners and other indoor seating areas. A stylish upholstered armchair or wingback chair can create an attractive seating corner, while a wooden high back chair can complement more traditional or contemporary furniture arrangements. The most suitable option depends on your available space and interior style.",
        },
        {
          id: 10,
          question:
            "Does ElaaInteriors provide on-site and workshop-based high back chair manufacturing?",
          answer:
            "ElaaInteriors offers manufacturing arrangements that can be discussed according to your project requirements. Depending on the chair design, available working space and site conditions, on-site or workshop-based manufacturing options may be considered. Contact our team to understand which option is suitable for your location and selected design.",
        },
        {
          id: 11,
          question:
            "How long does it take to manufacture a custom high back chair?",
          answer:
            "The manufacturing time depends on the chair design, frame construction, upholstery requirements, material selection and finishing details. A straightforward wooden chair may require a different production schedule from a detailed upholstered or tufted wingback chair. ElaaInteriors can discuss the expected manufacturing timeline after understanding your requirements and confirming the design.",
        },
        {
          id: 12,
          question:
            "Does ElaaInteriors manufacture high back chairs in Noida, Greater Noida and Ghaziabad?",
          answer:
            "ElaaInteriors caters to furniture requirements across Delhi NCR, including customers looking for high back chair manufacturing in Noida, Greater Noida and Ghaziabad. You can discuss your preferred chair style, frame material, fabric, cushioning and finishing requirements with our team to understand the available manufacturing options for your location.",
        },
        {
          id: 13,
          question:
            "Can I get a new high back chair manufactured in Delhi and Gurugram?",
          answer:
            "Customers in Delhi and Gurugram can contact ElaaInteriors to discuss their new high back chair manufacturing requirements. Whether you prefer a modern upholstered armchair, wooden high back chair, designer wingback chair or a comfortable accent chair, our team can help you explore suitable options according to your home interiors and preferences.",
        },
        {
          id: 14,
          question:
            "What should I consider before ordering a new high back chair?",
          answer:
            "Before ordering a high back chair, consider where you plan to place it, the available floor space, backrest height, seat dimensions, armrest design and cushioning preference. You should also compare upholstery fabrics, colours and frame finishes to ensure that the chair complements your existing furniture. Discussing these details with ElaaInteriors can help you select a design that suits your space and requirements.",
        },
      ],
    },
  },
  {
    slug: "new-recliner",
    HeroSection: {
      title:
        "Recliner Chair Manufacturer in Delhi NCR – Comfort Designed Around You",
      description:
        "ElaaInteriors is among the leading manufacturers of custom recliner chairs to make your home cozier. We design, upholster, and cushion new recliners tailored to your comfort and space. Whether you are looking for a manual or motorised recliner, or a single-seater lounge recliner, you can customise the styling, materials, and reclining features with our team to create the perfect recliner for everyday rest.",
      backgroundImage: "/services/new-recliner/hero.jpg",
      backgroundAlt:
        "Custom-made upholstered recliner chair in a cozy Delhi NCR living room",
    },
    Section2: {
      eyebrow: "RECLINERS BY ELAAINTERIORS",
      h2_title: "Comfortable Recliner Chair Designs for Relaxed Living",
      para: "A recliner can do more than a regular chair because you can lean back and stretch your legs out whenever you want to relax. ElaaInteriors manufactures new models of recliners with options for different types of upholstery, cushioning, and reclining mechanisms. Whether you are picking a comfortable chair to watch TV, read, or unwind after a long day, explore designs tailored to your room, taste, and seating comfort.",
      cards: [
        {
          id: 1,
          title: "Single-Seater Recliner Chairs",
          para: "Sit back in a comfortable one-seater recliner with an integrated footrest—perfect for your bedroom, living room, or personal lounge corner. Discuss your preferred dimensions, upholstery, and cushioning to find a layout that fits your home.",
          imageSrc: "/services/new-recliner/single-seater-recliner.jpg",
          tag: "Custom Build",
        },
        {
          id: 2,
          title: "Manual & Push-Back Recliner Chairs",
          para: "Enjoy straightforward reclining functionality with a manual recliner chair. Depending on the selected mechanism, the backrest and footrest can be adjusted using a lever or push-back movement without requiring an electrical connection. This option suits people who prefer a simple reclining experience with convenient, easy-to-understand operation.",
          imageSrc: "/services/new-recliner/manual-recliner.jpg",
          tag: "Manual",
        },
        {
          id: 3,
          title: "Motorised Recliner Chairs",
          para: "Experience convenient reclining with a motorised chair that adjusts through powered controls. Depending on the mechanism, you can change the reclining position with minimal physical effort. Discuss the available motor, control and upholstery options with our team to explore a design that matches your comfort preferences and room requirements.",
          imageSrc: "/services/new-recliner/motorised-recliner.jpg",
          tag: "Motorised",
        },
        {
          id: 4,
          title: "Rocker, Swivel & Upholstered Recliners",
          para: "Bring added versatility to your seating space with recliners that combine comfortable upholstery with features such as rocking or swivelling movement, where available. Choose from suitable fabric, colour, cushioning and backrest styles to complement your interiors. These designs can make an attractive addition to living rooms and dedicated relaxation corners.",
          imageSrc: "/services/new-recliner/rocker-swivel-recliner.jpg",
          tag: "Multi-Motion",
        },
      ],
    },
    Section3: {
      eyebrow: "WHY CHOOSE US?",
      h2_title:
        "Why Choose ElaaInteriors for Recliner Chair Manufacturing in Delhi NCR?",
      para: "ElaaInteriors believes in crafting a comfortable, easy-to-use recliner personalised to your chair size, style, upholstery, and padding. Our team offers the flexibility of on-site or workshop-based production depending on your project requirements. Compare our foam, upholstery, and fabric options—because true comfort is in the details, from frames and finishes to the reclining mechanisms you choose.",
      imageSrc: "/services/new-recliner/why-choose-us.jpg",
      imageTitleandAlt:
        "Craftsman assembling and upholstering a custom recliner chair mechanism",
      ctaLabel: "Contact now",
      ctaHref: "/contact-us",
    },
    section4: {
      eyebrow: "QUALITY ASSURANCE BY ELAAINTERIORS",
      h2_title: "Thoughtfully Made Recliners with Comfort in Every Detail",
      para: "A good recliner needs to do more than look attractive. Its frame, reclining mechanism, seat cushioning, backrest and footrest should work together to provide a comfortable seating experience. At ElaaInteriors, we consider these elements while planning your new recliner according to the selected design and requirements. From material selection and upholstery to fitting and finishing, our focus is on creating furniture that combines practical functionality with an appealing appearance.",
      materials: [
        {
          id: "frame-reclining-mechanism",
          title: "Frame & Reclining Mechanism",
          para: "The chair frame provides the structural support, while the reclining mechanism allows the backrest and footrest to move into different positions. We focus on selecting suitable components for the chosen design and ensuring that the mechanism and chair structure are properly fitted. Available mechanism options can be discussed before manufacturing.",
          imageSrc: "/services/new-recliner/quality-mechanism.jpg",
          imageAlt: "Heavy-duty steel reclining mechanism and hardwood recliner frame",
          highlights: ["Smooth recline action", "Manual & motorised", "Reinforced frame"],
        },
        {
          id: "seat-backrest-footrest-cushioning",
          title: "Seat, Backrest & Footrest Cushioning",
          para: "Comfort depends on how well the seat, backrest and footrest support you in different reclining positions. Explore available foam and cushioning options according to your preferred seating feel. The right combination helps maintain a comfortable shape and a consistent appearance across the chair.",
          imageSrc: "/services/new-recliner/quality-cushioning.jpg",
          imageAlt: "High-density multi-zone cushioning for seat, lumbar, and footrest",
          highlights: ["Full-body support", "High-density foam", "Holds shape"],
        },
        {
          id: "upholstery-fabric-selection",
          title: "Upholstery & Fabric Selection",
          para: "The upholstery influences the appearance, texture and everyday feel of your recliner. Explore available fabric and upholstery choices in different colours and finishes to complement your home interiors. Our team can present suitable material options so you can make your selection before production.",
          imageSrc: "/services/new-recliner/quality-upholstery.jpg",
          imageAlt: "Premium fabric and leatherette upholstery swatches for recliners",
          highlights: ["Breathable fabrics", "Leatherette options", "Custom colours"],
        },
        {
          id: "fitting-stitching-finishing",
          title: "Fitting, Stitching & Final Finishing",
          para: "A recliner has several moving and upholstered components that need careful fitting and finishing. From upholstery stitching and armrest detailing to the alignment of the reclining parts, we focus on the manufacturing details that contribute to a neat appearance and properly assembled chair.",
          imageSrc: "/services/new-recliner/quality-finishing.jpg",
          imageAlt: "Precision stitching and alignment on a newly built recliner chair",
          highlights: ["Clean seam detailing", "Aligned moving parts", "Neat finish"],
        },
      ],
      guarantee: {
        value: "5",
        unit: "Years",
        label: "Guarantee",
        note: "Backed by ElaaInteriors' quality assurance across structural framing, cushioning, upholstery, and craftsmanship.",
      },
      ctaLabel: "Discuss Your Recliner Requirements",
      ctaHref: "/contact-us",
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title:
        "Common Questions About New Recliner Chair Manufacturing in Delhi NCR",
      faqs: [
        {
          id: 1,
          question:
            "Where can I find a recliner chair manufacturer in Delhi NCR?",
          answer:
            "ElaaInteriors offers new recliner manufacturing services for customers looking for comfortable and personalised seating furniture in Delhi NCR. You can discuss your preferred chair design, reclining mechanism, dimensions, upholstery and cushioning requirements with our team. Whether you need a single-seater recliner or a design with additional features, we can help you explore suitable options for your home.",
        },
        {
          id: 2,
          question: "How much does a custom recliner chair cost in Delhi NCR?",
          answer:
            "The price of a recliner chair depends on its size, frame construction, reclining mechanism, upholstery, cushioning and additional features. A manual single-seater model may have different manufacturing costs from a motorised or rocker recliner. Share your preferred design and requirements with ElaaInteriors to discuss available materials and receive a personalised quotation.",
        },
        {
          id: 3,
          question:
            "What types of recliner chairs can ElaaInteriors manufacture?",
          answer:
            "You can discuss different residential recliner styles, including single-seater recliners, manual and push-back models, motorised chairs and designs with rocker or swivel functionality, depending on availability. The final configuration can be considered according to your preferred seating experience, room space, upholstery and design requirements.",
        },
        {
          id: 4,
          question:
            "What is the difference between a manual and a motorised recliner?",
          answer:
            "A manual recliner uses a mechanical mechanism, commonly operated through a lever or push-back movement, to adjust the seating position. A motorised recliner uses an electric motor and controls to adjust the backrest or footrest with less physical effort. Your choice depends on convenience, budget, power access and how frequently you plan to use the reclining function.",
        },
        {
          id: 5,
          question:
            "Can I get a single-seater recliner designed for my living room?",
          answer:
            "Yes. You can discuss a single-seater recliner according to your available room space and preferred seating dimensions. Consider the chair's width, backrest height and the extra clearance needed when it is fully reclined. ElaaInteriors can help you explore suitable design, cushioning and upholstery options for your living room.",
        },
        {
          id: 6,
          question:
            "Can I select the fabric, colour and upholstery for my recliner?",
          answer:
            "Yes. You can explore available fabric and upholstery options before finalising the design. Different colours, textures and finishes can change the overall appearance and feel of the chair. Our team can present suitable choices so you can select upholstery that complements your sofa, furniture and home interiors.",
        },
        {
          id: 7,
          question: "What materials are used in recliner chair manufacturing?",
          answer:
            "A recliner generally includes a supporting frame, a reclining mechanism, seat and backrest cushioning, footrest components and upholstery. The materials selected for these parts influence the chair's construction, appearance and seating experience. At ElaaInteriors, you can discuss the available material and upholstery options according to your chosen design.",
        },
        {
          id: 8,
          question:
            "Does a recliner chair need extra space to open fully?",
          answer:
            "Yes. A recliner usually needs additional clearance behind or in front of the chair, depending on its reclining mechanism and design. Before choosing one, measure the available floor area and consider the space required when the backrest is tilted and the footrest is extended. This helps you select a model that fits comfortably without restricting movement around the room.",
        },
        {
          id: 9,
          question:
            "Are recliner chairs suitable for everyday use at home?",
          answer:
            "A well-selected recliner can be used for everyday relaxation, reading and watching television. When choosing one, pay attention to the frame construction, reclining mechanism, cushioning and upholstery because these elements influence comfort and usability. The design should also suit the user's seating preferences and available room space.",
        },
        {
          id: 10,
          question:
            "Does ElaaInteriors provide on-site and workshop-based recliner manufacturing?",
          answer:
            "ElaaInteriors offers manufacturing arrangements that can be discussed according to your project requirements. The suitable option may depend on the chair design, availability of working space and requirements of the reclining mechanism. Contact our team to understand whether on-site or workshop-based production is appropriate for your selected model.",
        },
        {
          id: 11,
          question:
            "How long does it take to manufacture a new recliner chair?",
          answer:
            "The manufacturing time depends on the selected design, frame construction, mechanism, upholstery and finishing requirements. A straightforward manual recliner may involve a different production process from a model that includes motorised or additional movement features. ElaaInteriors can discuss the expected timeline after understanding your requirements and confirming the design.",
        },
        {
          id: 12,
          question:
            "Does ElaaInteriors provide recliner manufacturing in Noida, Greater Noida and Ghaziabad?",
          answer:
            "ElaaInteriors caters to furniture requirements across Delhi NCR, including customers looking for recliner manufacturing in Noida, Greater Noida and Ghaziabad. You can discuss your preferred seating style, reclining mechanism, upholstery and design requirements with our team to understand the available manufacturing arrangements for your location.",
        },
        {
          id: 13,
          question:
            "Can I get a new recliner chair manufactured in Delhi and Gurugram?",
          answer:
            "Customers in Delhi and Gurugram can contact ElaaInteriors to discuss their recliner manufacturing requirements. Whether you prefer a manual single-seater chair, an upholstered recliner or a motorised design, our team can help you explore suitable options based on your space, comfort preferences and interior style.",
        },
        {
          id: 14,
          question:
            "Does ElaaInteriors provide a warranty or guarantee on newly manufactured recliners?",
          answer:
            "Warranty or guarantee coverage should be confirmed according to the selected chair, reclining mechanism, frame, upholstery and other components. These parts may have different coverage conditions, particularly when a motorised mechanism is involved. Contact ElaaInteriors before placing your order to understand the applicable terms, coverage period and exclusions.",
        },
      ],
    },
  },
  {
    slug: "new-dining-chair",
    HeroSection: {
      title:
        "Custom Dining Chair Manufacturer in Delhi NCR – Made to Suit Your Dining Space",
      description:
        "Looking for dining chairs that complement your table and the way your home is designed? ElaaInteriors offers new dining chair manufacturing in Delhi NCR, with options for different frame styles, seating designs, cushioning and finishes. Whether you prefer classic wooden chairs, comfortable upholstered seating, cane-back designs or modern dining armchairs, you can discuss your preferred look and material choices with our team. We focus on creating seating that feels comfortable around the dining table and looks right in your home.",
      backgroundImage: "/services/new-dining-chair/hero.jpg",
      backgroundAlt:
        "Custom-crafted dining chairs around a modern wooden dining table in Delhi NCR",
    },
    Section2: {
      eyebrow: "DINING CHAIRS BY ELAAINTERIORS",
      h2_title:
        "Dining Chair Designs That Bring Comfort and Character to Your Home",
      para: "Dining chairs are used every day, so they should look good, feel comfortable and work well with your dining table. ElaaInteriors offers different styles of dining chairs to suit modern and traditional interiors. Explore wooden frames, upholstered seats, cushioned backrests, cane detailing and different armrest designs. You can discuss the chair dimensions, finish, fabric and required quantity with our team to find a suitable design for your dining area.",
      cards: [
        {
          id: 1,
          title: "Solid Wooden Dining Chairs",
          para: "Bring natural warmth and timeless appeal to your dining area with beautifully finished wooden dining chairs. From simple contemporary silhouettes to more traditional designs, wooden chairs can complement a wide range of dining tables and interiors. Discuss your preferred frame style, backrest design and wood finish to create seating that suits your home.",
          imageSrc: "/services/new-dining-chair/solid-wooden-chair.jpg",
          tag: "Artisan Wood",
        },
        {
          id: 2,
          title: "Upholstered & Cushioned Dining Chairs",
          para: "Make everyday dining more comfortable with chairs featuring cushioned seats and upholstered backrests. Explore different fabric textures, colours and cushioning preferences to create a seating style that feels welcoming and complements your dining room. These designs are particularly suitable for families who enjoy spending more time together around the table.",
          imageSrc: "/services/new-dining-chair/upholstered-chair.jpg",
          tag: "Custom Build",
        },
        {
          id: 3,
          title: "Cane & Rattan-Back Dining Chairs",
          para: "Add a natural, handcrafted touch to your dining space with cane and rattan-inspired chair designs. Their woven back details bring texture and visual interest while pairing beautifully with wooden frames and natural interior themes. Discuss the available cane, frame and seat-finish options to find a design that complements your dining furniture.",
          imageSrc: "/services/new-dining-chair/cane-rattan-chair.jpg",
          tag: "Handwoven",
        },
        {
          id: 4,
          title: "Dining Armchairs",
          para: "Give your dining area a more relaxed and distinctive look with dining chairs featuring supportive armrests. These designs can work particularly well at the ends of a dining table or as part of a coordinated seating arrangement. Explore suitable frame styles, seat cushioning and upholstery options according to your table design and available space.",
          imageSrc: "/services/new-dining-chair/dining-armchair.jpg",
          tag: "Armchair",
        },
        {
          id: 5,
          title: "Modern & Contemporary Dining Chairs",
          para: "For homes with a clean, modern interior, contemporary dining chairs offer a simple way to complete the dining area. Explore streamlined frames, distinctive backrest shapes, subtle detailing and coordinated finishes. Whether you prefer an understated look or a more eye-catching design, discuss the available options to suit your dining table and overall décor.",
          imageSrc: "/services/new-dining-chair/modern-contemporary-chair.jpg",
          tag: "Modern",
        },
      ],
    },
    Section3: {
      eyebrow: "WHY CHOOSE US?",
      h2_title:
        "Why Choose ElaaInteriors for Dining Chair Manufacturing in Delhi NCR?",
      para: "The right dining chairs should work with your table, fit comfortably into the room and reflect your personal taste. At ElaaInteriors, we take your seating requirements, preferred design and interior style into consideration before manufacturing. You can discuss chair dimensions, frame styles, armrests, cushioning and finishing options with our team. We also help you explore available fabrics, foam and upholstery materials before you make your selection. Depending on the design and project requirements, on-site or workshop-based manufacturing arrangements can also be discussed. Our aim is to create dining chairs that feel at home in your space rather than look like an unrelated addition.",
      imageSrc: "/services/new-dining-chair/why-choose-us.jpg",
      imageTitleandAlt:
        "Craftsman finishing a custom wooden and upholstered dining chair in the workshop",
      ctaLabel: "Contact Now",
      ctaHref: "/contact-us",
    },
    section4: {
      eyebrow: "QUALITY ASSURANCE BY ELAAINTERIORS",
      h2_title: "Thoughtful Construction for Comfortable Everyday Dining",
      para: "A dining chair needs to offer more than an attractive appearance. The frame should provide suitable support, the seat should feel comfortable and the overall dimensions should work with your dining table. At ElaaInteriors, we pay attention to these details while planning your new chairs. From frame construction and cushioning to upholstery and final finishing, we discuss the available choices according to your preferred design and requirements.",
      materials: [
        {
          id: "chair-frame-support",
          title: "Chair Frame & Structural Support",
          para: "The frame forms the foundation of a dining chair and supports its seat, backrest and armrests. We focus on appropriate frame construction and careful assembly to create a stable seating structure. Available frame materials and design options can be discussed before manufacturing.",
          imageSrc: "/services/new-dining-chair/quality-frame.jpg",
          imageAlt: "Solid hardwood dining chair frame and mortise joinery",
          highlights: ["Seasoned hardwood", "Reinforced joints", "Stable balance"],
        },
        {
          id: "seat-cushioning-support",
          title: "Seat Cushioning & Back Support",
          para: "The right seat and backrest make a difference during everyday meals and longer conversations around the table. Explore available foam and cushioning options according to your preferred seating feel and design. The selected arrangement should complement the chair's shape while providing comfortable support.",
          imageSrc: "/services/new-dining-chair/quality-cushioning.jpg",
          imageAlt: "High-density seat padding and ergonomic dining chair backrest",
          highlights: ["Ergonomic posture", "High-density foam", "Long-meal comfort"],
        },
        {
          id: "fabric-upholstery-cane",
          title: "Fabric, Upholstery & Cane Detailing",
          para: "The materials used on a chair influence its overall appearance and feel. Choose from available fabric colours, textures, upholstery styles and decorative details to coordinate with your dining table and interiors. Where applicable, cane or woven-back designs can also be discussed with our team.",
          imageSrc: "/services/new-dining-chair/quality-materials.jpg",
          imageAlt: "Upholstery fabric swatches and natural woven cane detailing",
          highlights: ["Stain-friendly fabrics", "Natural woven cane", "Custom colours"],
        },
        {
          id: "dimensions-finishing-workmanship",
          title: "Dimensions, Finishing & Workmanship",
          para: "A dining chair should be proportioned to work comfortably with the table rather than simply look attractive on its own. We consider the seat, backrest and armrest design along with the intended finish. Careful fitting, stitching, assembly and finishing help create a neat final appearance.",
          imageSrc: "/services/new-dining-chair/quality-finishing.jpg",
          imageAlt: "Smooth wood polish and tailored upholstery stitching on dining chairs",
          highlights: ["Table-matched height", "Smooth wood polish", "Precision stitching"],
        },
      ],
      guarantee: {
        value: "5",
        unit: "Years",
        label: "Guarantee",
        note: "Backed by ElaaInteriors' quality assurance across frame joinery, cushioning, upholstery, and finishing.",
      },
      ctaLabel: "Discuss Your Dining Chair Requirements",
      ctaHref: "/contact-us",
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title:
        "Common Questions About New Dining Chair Manufacturing in Delhi NCR",
      faqs: [
        {
          id: 1,
          question:
            "Where can I find a custom dining chair manufacturer in Delhi NCR?",
          answer:
            "ElaaInteriors provides new dining chair manufacturing services for customers looking for personalised furniture in Delhi NCR. You can discuss your preferred chair design, frame material, upholstery, cushioning, dimensions and finish with our team. Whether you need wooden dining chairs, cushioned seating, cane-back designs or dining armchairs, we help you explore options suited to your home.",
        },
        {
          id: 2,
          question:
            "How much does it cost to manufacture dining chairs in Delhi NCR?",
          answer:
            "The cost depends on the chair design, frame material, dimensions, cushioning, upholstery and finishing requirements. A simple wooden chair may have different manufacturing costs from an upholstered or detailed dining armchair. The number of chairs required can also affect the overall quotation. Share your preferred design and requirements with ElaaInteriors to discuss the available options and receive a personalised estimate.",
        },
        {
          id: 3,
          question:
            "Can dining chairs be made to match my existing dining table?",
          answer:
            "Yes. You can discuss your existing dining table's height, design, finish and available seating space before finalising your chairs. The seat height, backrest and armrest dimensions can be considered so the new seating looks coordinated and fits comfortably around the table.",
        },
        {
          id: 4,
          question:
            "What types of dining chairs can ElaaInteriors manufacture?",
          answer:
            "You can explore different residential styles, including solid wooden dining chairs, upholstered and cushioned chairs, cane or rattan-back designs, dining armchairs and modern contemporary chairs. The final design can be discussed according to your dining table, interior style, seating preferences and required quantity.",
        },
        {
          id: 5,
          question:
            "Are wooden dining chairs a good choice for everyday use?",
          answer:
            "Wooden dining chairs are a popular choice because they complement many interior styles and can be finished in different colours and designs. Their suitability for everyday use depends on the frame construction, joints, finish and overall workmanship. You can discuss the available material and design options with ElaaInteriors according to your requirements.",
        },
        {
          id: 6,
          question:
            "Can I choose the fabric and cushioning for upholstered dining chairs?",
          answer:
            "Yes. You can explore available upholstery fabrics, colours, textures and cushioning options before confirming your design. Our team can present suitable material choices so that you can compare their appearance and seating feel. This also helps you coordinate the chairs with your dining table and other furniture.",
        },
        {
          id: 7,
          question:
            "Can I get dining chairs with a cane or rattan backrest?",
          answer:
            "You can discuss cane and rattan-style backrest designs with ElaaInteriors, depending on the available material and manufacturing options. These styles can add texture and a natural look to a dining area, especially when paired with wooden frames. Contact our team to confirm the designs and finishes currently available.",
        },
        {
          id: 8,
          question:
            "Can I choose dining chairs with or without armrests?",
          answer:
            "Yes. Both armrest and armless styles can be considered according to your seating preferences and dining table design. Armchairs can offer a more relaxed seating style, while armless chairs are often easier to arrange around a table. Before finalising your design, consider the available space and whether the arms can fit comfortably beneath the table.",
        },
        {
          id: 9,
          question:
            "Can I order a single dining chair or a complete set?",
          answer:
            "You can discuss the required quantity with ElaaInteriors, whether you need an individual replacement chair or several matching chairs for your dining area. The design, dimensions and finish can be planned around your existing furniture and seating requirements. Confirm the available manufacturing quantity when requesting your quotation.",
        },
        {
          id: 10,
          question: "What materials are used in dining chair manufacturing?",
          answer:
            "Dining chairs generally combine a supporting frame with seat and backrest components, and may include foam cushioning, upholstery fabric or cane detailing depending on the design. The choice of materials influences the chair's appearance, construction and seating experience. Our team can discuss the available options before manufacturing begins.",
        },
        {
          id: 11,
          question:
            "How do I choose the right dining chair size for my table?",
          answer:
            "Start by measuring your dining table and the space available around it. Consider the seat height, chair width, backrest height and armrest dimensions. There should be enough room for people to sit comfortably, move their chairs and get in and out without crowding one another. Sharing your table measurements with our team can help you discuss a suitable design.",
        },
        {
          id: 12,
          question:
            "Does ElaaInteriors offer on-site and workshop-based dining chair manufacturing?",
          answer:
            "Manufacturing arrangements can be discussed according to your preferred design and project requirements. Depending on the chair's construction, available working space and site conditions, on-site or workshop-based work may be considered. Contact our team to understand which option is suitable for your project.",
        },
        {
          id: 13,
          question:
            "Does ElaaInteriors provide new dining chair manufacturing in Noida, Greater Noida and Ghaziabad?",
          answer:
            "ElaaInteriors caters to furniture requirements across Delhi NCR, including customers looking for new dining chairs in Noida, Greater Noida and Ghaziabad. You can discuss your preferred style, dimensions, frame material and upholstery requirements with our team to understand the available manufacturing arrangements for your location.",
        },
        {
          id: 14,
          question:
            "Can I get new dining chairs manufactured in Delhi and Gurugram?",
          answer:
            "Customers in Delhi and Gurugram can contact ElaaInteriors to discuss their dining chair requirements. Whether you prefer wooden seating, cushioned upholstery, cane-back detailing or a contemporary dining armchair, our team can help you explore designs that complement your dining table and home interiors.",
        },
      ],
    },
  },
];