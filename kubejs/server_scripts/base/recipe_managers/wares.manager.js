// priority: 100
global.allAgreements = [];
const sealsThatHaveTextures = [
  // add entries to this list when you add textures for the companies
  "magical_landscaping_co",
  "black_hole_bagels_llc",
  "boards_and_wires",
  "bobs_construction_fleet",
  "interstellar_livestock_logistics",
  "qube",
  "stellar_sigil_syndicate",
  "cosmic_cuisine_collective",
  "galactic_beast_deliveries",
];

function getAgreement({
  paymentItems,
  requestedItems,
  title,
  orderedAmount,
  company,
  message,
}) {
  if (orderedAmount === null || orderedAmount === undefined)
    orderedAmount = parseInt(1);
  if (!title) title = "stuffs";
  message = message.replaceAll("'", ""); // remove single quotes from messages
  let seal = sealsThatHaveTextures.includes(company) ? company : "default";
  let companyTitle = Utils.snakeCaseToTitleCase(company);

  let agreementObj = {
    item: Item.of(
      "wares:delivery_agreement",
      `{\
          display:{Name:'{\"text\":\"${
            companyTitle + " - " + title
          }\",\"italic\":\"false\"}'},\
          ordered:${orderedAmount},\
          message:'{"text":"${message}"}',\
          seal:'${seal}',\
          buyerName:'{"color":"#409D9B","text":"${companyTitle}"}',\
          paymentItems:${simple(paymentItems)},\
          requestedItems:${simple(requestedItems)},\
          title:\'{"text":"${title}"}\'\
      }`
    ),
    completedItem: Item.of(
      "wares:completed_delivery_agreement",
      `{\
          buyerName:'{"color":"#409D9B","text":"${companyTitle}"}',\
          delivered:${orderedAmount},\
          display:{Name:'{\"text\":\"${
            companyTitle + " - " + title
          }\",\"italic\":\"false\"}'},\
          isCompleted:1b,\
          message:'{"text":"${message}"}',\
          seal:'${seal}',\
          ordered:${orderedAmount},\
          paymentItems:${simple(paymentItems)},\
          requestedItems:${simple(requestedItems)},\
          title:\'{"text":"${title}"}\'\
      }`
    ),
  };
  global.allAgreements = global.allAgreements
    .filter((f) => f.nbt !== agreementObj.item.nbt)
    .concat([agreementObj.item]);
  if (orderedAmount != 0)
    global.allAgreements = global.allAgreements
      .filter((f) => f.nbt !== agreementObj.completedItem.nbt)
      .concat([agreementObj.completedItem]);
  return agreementObj;
}
function simple(items) {
  if (!Array.isArray(items)) items = [items];
  return `[${items
    .map((item_obj) => {
      let item = item_obj;
      if (typeof item_obj === "string") {
        item = Item.of(item);
      }
      let nbt = item.toNBT();
      nbt.Count = item.count;
      if (typeof item_obj === "string" && item_obj.includes("#")) {
        //support for tags
        if (item_obj.includes("x ")) item_obj = item_obj.split("x ")[1];
        let tag = (
          Ingredient.of(item_obj).values[0].serialize().get("tag") + ""
        ).replaceAll('"', "");
        nbt.id = `#${tag}`;
      }
      return nbt;
    })
    .join(", ")}]`;
}

function tradeBranch(outputTrades, inputTrades) {
  if (!Array.isArray(outputTrades)) outputTrades = [outputTrades];
  if (!Array.isArray(inputTrades)) inputTrades = [inputTrades];
  if (inputTrades.length == 1) {
    inputTrades.push({ completedItem: Item.of("stick") });
  }
  addMixing(
    outputTrades.map((trade) => trade.item),
    inputTrades.map((trade) => trade.completedItem.weakNBT())
  );
}

console.info("Loading wares manager");
ServerEvents.lowPriorityData((event) => {
  let obj = {
    added: [],
  };
  console.info("all agreements  " + global.allAgreements);
  global.allAgreements.forEach((item) => {
    obj.added.push({
      stack: `item:${item.id}${item.nbt}`,
    });
  });

  JsonIO.write("kubejs/assets/emi/index/stacks/added_agreements.json", obj);
});
