/**
 * Long-form article bodies for the Journal, keyed by the JOURNAL slugs in
 * src/lib/site.ts. Kept local to this route (site.ts is a shared file and must
 * not be modified). Each block renders as a heading, paragraph or pull-quote.
 */

export type ArticleBlock =
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; cite?: string };

export type Article = {
  author: string;
  authorTitle: string;
  blocks: ArticleBlock[];
};

export const ARTICLES: Record<string, Article> = {
  "the-architecture-of-stillness": {
    author: "Marguerite Faure",
    authorTitle: "Design Editor, The Journal",
    blocks: [
      {
        type: "paragraph",
        text: "The first thing you notice about Aurelia is what you do not notice. There is no grand entrance, no soaring lobby, no monument to arrival. The seaplane sets you down on the lagoon and the island simply receives you — low, quiet, half-hidden among the palms, as though it had always been there and always would be. This is precisely what Studio Kenzō Aramaki intended. “A great building on a small island,” Aramaki once said, “is a kind of rudeness.”",
      },
      {
        type: "paragraph",
        text: "For three years before the first foundation was poured, the studio did almost nothing but watch. They mapped the path of the sun across every season, traced the prevailing winds, and marked where the light fell softest at dusk. Every residence at Aurelia is turned a few precise degrees away from its neighbour, so that no guest ever sees another roofline from their deck. The island holds thirty-four residences and yet, from within any one of them, you would swear you were alone.",
      },
      {
        type: "subheading",
        text: "The luxury of subtraction",
      },
      {
        type: "paragraph",
        text: "Aramaki’s reputation was built not on what he added to a place but on what he was willing to take away. At Aurelia the vocabulary is deliberately narrow — hand-troweled lime, unlacquered teak, coral stone quarried and returned, linen the colour of the sand at noon. There is no marble flown from Carrara, no gold leaf, no chandelier. The restraint is not thrift. It is the most expensive decision of all, because restraint cannot be bought in bulk; it must be judged, line by line, by someone with the confidence to leave the wall bare.",
      },
      {
        type: "quote",
        text: "We did not want guests to admire the architecture. We wanted them to forget it, and to remember the sea.",
        cite: "Kenzō Aramaki, founding architect",
      },
      {
        type: "paragraph",
        text: "That forgetting is engineered with obsessive care. The thresholds between inside and out are level to the millimetre, so the eye never catches a step. Glass walls retract entirely into the structure, dissolving the boundary between a room and the reef beyond it. Even the artificial light is tuned to 2200 kelvin — the exact warmth of a candle — and dimmed on an astronomical clock, so that as the sun sets, the interiors fall with it, and the stars are never bullied by a bulb.",
      },
      {
        type: "subheading",
        text: "Building for the island, not the brochure",
      },
      {
        type: "paragraph",
        text: "Sustainability, at Aurelia, was never a wing added to the plan. It was the plan. The residences are oriented for cross-ventilation so completely that air-conditioning is a rarely used guest, not a permanent tenant. Rainwater is caught and held; the sun is harvested and stored; the coral displaced during construction was nursed in the studio’s own laboratory and replanted, cell by cell, once the work was done. Aramaki liked to say that the highest compliment the reef could pay the resort was to grow back over it.",
      },
      {
        type: "paragraph",
        text: "Stand on the deck of an Ocean Lagoon Room at the hour the light goes long, and you understand the whole philosophy in a single breath. The water is at your feet, the sky at your window, and between them almost nothing that a human made. That is the architecture of stillness — a discipline so total that it disappears, leaving only the island, the horizon, and the rare, expensive gift of your own uninterrupted attention.",
      },
    ],
  },

  "a-reef-reborn": {
    author: "Dr. Nadia Sørensen",
    authorTitle: "Marine Science Correspondent",
    blocks: [
      {
        type: "paragraph",
        text: "At six in the morning, while the residences still sleep, a small boat leaves the marina and motors quietly to the eastern edge of the atoll. Aboard are four members of Aurelia’s marine team, a crate of ceramic frames, and the day’s most important cargo: several hundred fragments of living coral, each no larger than a fingertip, each the beginning of something the reef has been waiting a long time to become.",
      },
      {
        type: "paragraph",
        text: "When the reserve’s conservation programme began, the reef off Maré Séraphine bore the scars of a warming decade — pale skeletons where colour should have been, hectares of rubble that no fish would call home. Today, eleven hectares have been brought back to life. It is one of the largest privately funded coral restorations in the South Pacific, and it happens, almost invisibly, an hour before breakfast.",
      },
      {
        type: "subheading",
        text: "The nursery beneath the surface",
      },
      {
        type: "paragraph",
        text: "The method is patient and unglamorous, which is why it works. Healthy coral is fragmented — a process the animal survives readily — and each piece is fixed to a frame in an underwater nursery where it grows in protected water. Coral that would take decades to establish on open reef can reach transplantable size in under a year. Once robust, the colonies are carried to the degraded sites and cemented in place by hand, one diver, one fragment, one square metre at a time.",
      },
      {
        type: "quote",
        text: "We are not planting a garden. We are lending the reef a scaffold, and then getting out of its way.",
        cite: "Reef Conservation Lead, Aurelia Reserve",
      },
      {
        type: "paragraph",
        text: "The numbers tell part of the story. Coral cover across the restored sites has climbed from under nine per cent to above forty. Fish surveys record species that had not been seen in the lagoon for years — the return of parrotfish, of reef sharks patrolling the drop-off, of the small, bright commotion of a reef that has decided to live. But the numbers are only the accounting. The real measure is what a guest sees now when they slip beneath the surface with the resident biologist: a wall of colour, moving.",
      },
      {
        type: "subheading",
        text: "Why a resort tends a reef",
      },
      {
        type: "paragraph",
        text: "There is a hard commercial logic here, and Aurelia does not pretend otherwise. A dead reef is a dead attraction; a living one is the reserve’s greatest asset, worth more than any suite. But spend a dawn with the team — watch them log water temperature, check each frame, greet returning fish almost by name — and the logic softens into something closer to devotion. They are not maintaining an amenity. They are raising a place.",
      },
      {
        type: "paragraph",
        text: "Guests are invited to take part, and many do. A morning on the nursery, fixing a fragment of coral that will outlive your stay by decades, has a way of reordering priorities. You return to your residence salted, tired and quietly changed, having done a small, real thing for a reef that will keep growing long after the seaplane has carried you home. That, in the end, is the point of a reef reborn: not that we saw it, but that it will still be here.",
      },
    ],
  },

  "nine-courses-one-tide": {
    author: "Julien Aubry",
    authorTitle: "Dining Editor, The Journal",
    blocks: [
      {
        type: "paragraph",
        text: "The menu at Maré is written twice a day, and never in advance. Chef Elise Moreau does not decide what her guests will eat until she knows what the reef, the garden and the ocean have decided to give. “A menu printed in January,” she says, “is a promise you will have to break by March.” So there is no printed menu at all — only a chef, a tide chart, and nine courses that assemble themselves over the course of a single day.",
      },
      {
        type: "paragraph",
        text: "The day begins in the dark. A line goes out at first light from the reserve’s small boat, and whatever comes back — a wahoo, a handful of reef fish, a single perfect trevally — sets the spine of the evening. Nothing at Maré travels further than the reef, the garden or the day’s catch. It is a rule Moreau enforces with something close to severity, and it is the reason the two Michelin stars above the door feel less like a trophy than a description.",
      },
      {
        type: "subheading",
        text: "Cooking the larder of an island",
      },
      {
        type: "paragraph",
        text: "By mid-morning the garden is picked — tomatoes still warm, herbs cut minutes before they are needed, the small bitter greens that grow only in the island’s volcanic shade. Moreau walks the beds herself, tasting as she goes, building the menu in her head the way a composer hears a piece before a note is played. “Luxury,” she likes to say, “is a tomato picked an hour ago and a table where time forgets you.” At Maré, the first half of that sentence makes the second half possible.",
      },
      {
        type: "quote",
        text: "The ocean sets the menu. I just try to translate it before the tide changes its mind.",
        cite: "Elise Moreau, Executive Chef, Maré",
      },
      {
        type: "paragraph",
        text: "Service begins as the sun starts to fall. The tables sit at the water’s edge, close enough that the lagoon is part of the room, and the nine courses arrive in a rhythm scored to the light. An early course of raw fish and green mango, bright and cold. A broth drawn from the day’s bones, poured at the table. A course of coral-grown salt and fire-charred catch that tastes, impossibly, of the exact water you can see. By the time the plates turn to the garden’s fruit and the cellar’s rarest sweet wines, the sky has gone black and the stars have come out over the water.",
      },
      {
        type: "subheading",
        text: "One tide, and then it is gone",
      },
      {
        type: "paragraph",
        text: "What makes a dinner at Maré unrepeatable is that it cannot be repeated. The exact menu you eat has never been served before and will never be served again, because the tide that made it has already turned. Guests sometimes ask for the recipe of a dish that undid them; Moreau smiles and tells them the truth — that the recipe was the day, and the day is over. It is a hard thing to sell and an easy thing to love.",
      },
      {
        type: "paragraph",
        text: "This is why guests who have eaten everywhere still talk about the meal at Maré as a kind of turning point. It is not the technique, formidable as it is, nor the stars, nor the wine drawn up from twelve thousand bottles beneath the coral. It is the sense of having eaten a single day of a single island, caught at the exact moment it was most itself — nine courses, one tide, and then, like the light on the water, gone.",
      },
    ],
  },
};
