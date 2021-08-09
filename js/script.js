"use strict";
function e$(name, parent = document) {
    switch (name.charAt(0)) {
        case ".":
            return parent.getElementsByClassName(name.slice(1));
        default:
            return parent.getElementById(name);
    }
}
function e$c(type, options) {
    if (options) {
        return Object.assign(document.createElement(type), options);
    }
    else {
        return document.createElement(type);
    }
}
function toUInt32(floatVar) { return floatVar >>> 0; }
class Random {
    constructor(initSeed = 51113926) {
        const nextSeed = (seed) => toUInt32(Math.imul(11812433253, seed) + 1);
        const firstSeed = toUInt32(initSeed), secondSeed = nextSeed(firstSeed), thirdSeed = nextSeed(secondSeed), fourthSeed = nextSeed(thirdSeed);
        this.seed = [
            firstSeed,
            secondSeed,
            thirdSeed,
            fourthSeed
        ];
    }
    get state() {
        return [...this.seed];
    }
    set state(oldState) {
        this.seed = [...oldState];
    }
    get nextInt() {
        return this.nextUInt % 0x7FFFFFFF;
    }
    get next() {
        return this.nextInt;
    }
    get value() {
        return 1 - this.rangeFloat();
    }
    get nextUInt() {
        let x = this.seed.shift();
        let y = this.seed[2];
        x ^= x << 11;
        x ^= x >>> 8;
        y ^= y >>> 19;
        y = toUInt32(y ^ x);
        this.seed.push(y);
        return y;
    }
    getWeight(table) {
        return table.reduce((totalWeight, currentItem) => totalWeight + currentItem.weight, 0);
    }
    getItem(table, masterTable, randomNum) {
        return masterTable.relic[(table.find((currentItem) => ((randomNum -= currentItem.weight) <= 0))).masterIndex].display;
    }
    range(min = 0, max = 99999999) {
        if (max < min) {
            [min, max] = [max, min];
        }
        return this.nextUInt % (max - min) + min;
    }
    rangeFloat(min = 0, max = 1) {
        if (max < min) {
            [min, max] = [max, min];
        }
        return (max - min) * (1 - (toUInt32(this.nextUInt << 9) / 0xFFFFFFFF)) + min;
    }
    rangeInclusive(min, max) {
        return this.range(min, max + 1);
    }
    getWeightedElement(table) {
        let output = 0;
        const totalWeight = table.reduce((totalWeight, currentItem) => totalWeight + currentItem.weight, 0);
        let randWeight = this.rangeInclusive(1, totalWeight);
        try {
            output = table.find((currentItem) => ((randWeight -= currentItem.weight) <= 0)).masterIndex;
        }
        catch {
            output = 156;
        }
        return output;
    }
    loot(table) {
        return this.getWeightedElement(table);
    }
    getWeightedTable(table) {
        const totalWeight = table.reduce((totalWeight, currentItem) => totalWeight + currentItem.weight, 0);
        let randWeight = this.rangeInclusive(1, totalWeight);
        return table.find((currentItem) => ((randWeight -= currentItem.weight) <= 0));
    }
    shuffle(list) {
        let workingList = [...list];
        let i = workingList.length;
        while (i > 1) {
            let index = this.range(0, i--);
            let value = workingList[index];
            workingList[index] = workingList[i];
            workingList[i] = value;
        }
        return workingList;
    }
}
const lootTables = {
    relic: [],
    relicAll: [],
    relicShop: [],
    relicFinal: [],
    relicStarter: [],
    relicLegendary: [],
    potion: [],
    potionShop: [],
    potionDibble: [],
    potionFinal: [],
    food: [],
    item: [],
    itemShop: [],
    itemDibble: [],
    dibble: [],
    dibbleRelic: [],
    potionOrRelic: []
};
const rand = {
    default: null,
    layout: null,
    relic: null,
    blessing: null,
    blueprint: null,
    basicItem: null,
    potion: null,
    health: null,
    resource: null,
    shopRelic: null,
    shopPotion: null,
    shopHealth: null,
    shopBasicItem: null,
    Legendary: null,
    dibble: null,
    misc: null,
    shop: null,
    majorCurse: null,
    minorCurse: null,
    familiar: null,
    upgrade: null,
    chaos: null,
    table: null
};
let settings = {
    checkboxes: {
        relic: null,
        potion: null
    },
    altarRelic: -1,
    flags: {
        shop_basic_item: 1,
        shop_food: 1,
        shop_potion_relic: 1,
        dibble_extra_item: 0,
        dibble_relic: 0,
        relicHex: 0,
        dog_shadow_found: 0,
        delve_count: 0,
        bard_met: 0,
        secret_treasure_note: 0,
        foundRatBond: 0,
        priestess_met: 0,
        haveGuacamole: 0,
        peasant1_unlocked: 0,
        blacksmith_rescued: 0,
        foundWaylandsBoots: 0,
        mushroom_green: 0,
        mushroom_blue: 0,
        mushroom_purple: 0,
        apprentice_met: 0,
        black_rabbit_met: 0,
        rockmimic_defeated: 0,
        hoodie_met: 0,
        hoodie_met_mine: 0,
        tribute_fountain_encountered: 0,
        peasant2_unlocked: 0,
        dibble_upgrade_count: 0,
        prisoner_key: 0,
        altar_encountered: 0,
        haveWhip: 0,
        haveHat: 0,
        haveCircinus: 0,
        bog_unlocked: 0
    }
};
const seedRand = new Random(Date.now());
function loadSave(radio, file) {
    const settingsOut = {
        checkboxes: {
            relic: null,
            potion: null
        },
        altarRelic: -1,
        flags: {
            shop_basic_item: 1,
            shop_food: 1,
            shop_potion_relic: 1,
            dibble_extra_item: 0,
            dibble_relic: 0,
            relicHex: 0,
            dog_shadow_found: 0,
            delve_count: 0,
            bard_met: 0,
            secret_treasure_note: 0,
            foundRatBond: 0,
            priestess_met: 0,
            haveGuacamole: 0,
            peasant1_unlocked: 0,
            blacksmith_rescued: 0,
            foundWaylandsBoots: 0,
            mushroom_green: 0,
            mushroom_blue: 0,
            mushroom_purple: 0,
            apprentice_met: 0,
            black_rabbit_met: 0,
            rockmimic_defeated: 0,
            hoodie_met: 0,
            hoodie_met_mine: 0,
            tribute_fountain_encountered: 0,
            peasant2_unlocked: 0,
            dibble_upgrade_count: 0,
            prisoner_key: 0,
            altar_encountered: 0,
            haveWhip: 0,
            haveHat: 0,
            haveCircinus: 0,
            bog_unlocked: 0
        }
    };
    const CBRelic = Object.values(e$("relic-selection").getElementsByTagName("input"));
    const CBPotion = Object.values(e$("potion-selection").getElementsByTagName("input"));
    switch (radio.value) {
        case "0":
            break;
        case "100":
            settingsOut.checkboxes.relic = CBRelic;
            settingsOut.checkboxes.potion = CBPotion;
            settingsOut.altarRelic = 149;
            settingsOut.flags.shop_basic_item = 2;
            settingsOut.flags.shop_food = 3;
            settingsOut.flags.shop_potion_relic = 3;
            settingsOut.flags.dibble_extra_item = 1;
            settingsOut.flags.dibble_relic = 1;
            settingsOut.flags.relicHex = 0;
            settingsOut.flags.dog_shadow_found = 1;
            settingsOut.flags.delve_count = 100;
            settingsOut.flags.bard_met = 0;
            settingsOut.flags.secret_treasure_note = 0;
            settingsOut.flags.foundRatBond = 1;
            settingsOut.flags.priestess_met = 3;
            settingsOut.flags.haveGuacamole = 0;
            settingsOut.flags.peasant1_unlocked = 1;
            settingsOut.flags.blacksmith_rescued = 1;
            settingsOut.flags.foundWaylandsBoots = 1;
            settingsOut.flags.mushroom_green = 1;
            settingsOut.flags.mushroom_blue = 1;
            settingsOut.flags.mushroom_purple = 1;
            settingsOut.flags.apprentice_met = 7;
            settingsOut.flags.black_rabbit_met = 1;
            settingsOut.flags.rockmimic_defeated = 1;
            settingsOut.flags.hoodie_met = 1;
            settingsOut.flags.hoodie_met_mine = 1;
            settingsOut.flags.tribute_fountain_encountered = 0;
            settingsOut.flags.peasant2_unlocked = 1;
            settingsOut.flags.dibble_upgrade_count = 4;
            settingsOut.flags.prisoner_key = 1;
            settingsOut.flags.altar_encountered = 0;
            settingsOut.flags.haveWhip = 0;
            settingsOut.flags.haveCircinus = 0;
            settingsOut.flags.haveHat = 0;
            settingsOut.flags.bog_unlocked = 1;
            break;
        case "own":
            const saveData = JSON.parse(file);
            settingsOut.checkboxes.relic = saveData.unlocked.flatMap(craftedGUID => CBRelic.find(box => parseInt(box.value) === masterTable.relic.findIndex(relic => relic.guid === craftedGUID)) ?? []);
            settingsOut.checkboxes.potion = saveData.unlocked.flatMap(craftedGUID => CBPotion.find(box => parseInt(box.value) === masterTable.potion.findIndex(potion => potion.guid === craftedGUID)) ?? []);
            settingsOut.altarRelic = masterTable.relic.findIndex(relic => relic.guid === saveData.altarItemID);
            saveData.upgradeString.split(",").forEach(item => {
                const [key, value] = item.split(":");
                settingsOut.flags[key] = parseInt(value);
            });
            break;
    }
    return settingsOut;
}
function applySettings(settings) {
    checkAll(e$("relic-selection").getElementsByTagName("input"), false);
    if (settings.checkboxes.relic) {
        checkAll(settings.checkboxes.relic, true);
    }
    checkAll(e$("potion-selection").getElementsByTagName("input"), false);
    if (settings.checkboxes.potion) {
        checkAll(settings.checkboxes.potion, true);
    }
    e$("altar").value = settings.altarRelic;
}
;
const masterTable = {
    relic: [
        {
            guid: "1981b4af04434077afafc78691056387",
            name: "WaylandsBoots",
            display: "Wayland's Boots",
            details: "Break spikes",
            rarity: "Common",
            crafting: 8,
            cost: 375,
            extra: "",
            tables: {
                relic: {
                    index: 5,
                    weight: 9
                },
                relicAll: {
                    index: 3,
                    weight: 9
                }
            }
        },
        {
            guid: "25a2fe2d57a34b6598d34cbbb58fdeb0",
            name: "Galoshes",
            display: "Galoshes",
            details: "Walk and jump on oil and poison",
            rarity: "Common",
            crafting: 0,
            cost: 275,
            extra: "",
            tables: {
                relic: {
                    index: 6,
                    weight: 9
                },
                relicAll: {
                    index: 56,
                    weight: 9
                },
                relicShop: {
                    index: 31,
                    weight: 9
                }
            }
        },
        {
            guid: "d2b0fec2b4cf44e8aa63b0aa94441fd5",
            name: "FloatBoots",
            display: "Float Boots",
            details: "Walk on air",
            rarity: "Common",
            crafting: 0,
            cost: 450,
            extra: "",
            tables: {
                relic: {
                    index: 41,
                    weight: 9
                },
                relicAll: {
                    index: 54,
                    weight: 9
                },
                relicShop: {
                    index: 15,
                    weight: 9
                }
            }
        },
        {
            guid: "7ee59f418896447ca03ce09665771ae6",
            name: "LavaWalkers",
            display: "Lava Walkers",
            details: "Walk on fire",
            rarity: "Common",
            crafting: 26,
            cost: 275,
            extra: "",
            tables: {
                relic: {
                    index: 50,
                    weight: 9
                },
                relicAll: {
                    index: 103,
                    weight: 9
                },
                relicShop: {
                    index: 18,
                    weight: 3
                }
            }
        },
        {
            guid: "a7ae4ce21346402ca6fe2ad0c09b1c14",
            name: "HeliosBoots",
            display: "Helios Boots",
            details: "Oil + Fire",
            rarity: "Legendary",
            crafting: 0,
            cost: 550,
            extra: "Combined from Galoshes & Lava Walkers",
            tables: {}
        },
        {
            guid: "23f1ec241ee449419dfcf3db6ede4f8a",
            name: "HeavyBoots",
            display: "Heavy Boots",
            details: "Jump again in midair",
            rarity: "Common",
            crafting: 22,
            cost: 275,
            extra: "",
            tables: {
                relic: {
                    index: 110,
                    weight: 9
                },
                relicAll: {
                    index: 121,
                    weight: 9
                },
                relicShop: {
                    index: 51,
                    weight: 9
                }
            }
        },
        {
            guid: "fe3880cccffb46a6ba510453822df02b",
            name: "ButchersCleaver",
            display: "Butcher's Cleaver",
            details: "Sometimes drop meat from your enemies",
            rarity: "Common",
            crafting: 0,
            cost: 525,
            extra: "",
            tables: {
                relic: {
                    index: 48,
                    weight: 9
                },
                relicAll: {
                    index: 28,
                    weight: 9
                },
                relicStarter: {
                    index: 1,
                    weight: 9
                }
            }
        },
        {
            guid: "637c8bf20a8d4e6da5bcd6bbbac68f12",
            name: "KeyBlade",
            display: "Key Blade",
            details: "Increases swing damage for each key you have",
            rarity: "Common",
            crafting: 0,
            cost: 375,
            extra: "",
            tables: {
                relic: {
                    index: 42,
                    weight: 9
                },
                relicAll: {
                    index: 57,
                    weight: 9
                }
            }
        },
        {
            guid: "9919d2d2d31941f2a96f898d56e8d297",
            name: "LegendaryBlade",
            display: "Master Pickaxe",
            details: "Fire projectiles at full health",
            rarity: "Rare",
            crafting: 50,
            cost: 600,
            extra: "",
            tables: {
                relic: {
                    index: 52,
                    weight: 3
                },
                relicAll: {
                    index: 104,
                    weight: 3
                },
                relicFinal: {
                    index: 14,
                    weight: 3
                }
            }
        },
        {
            guid: "49e257bc3ed04cde9e5b0a7089d7af10",
            name: "Mjolnir",
            display: "Mjölnir",
            details: "Thrown pickaxe summons lightning on hit",
            rarity: "Legendary",
            crafting: 0,
            cost: 850,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 5,
                    weight: 1
                }
            }
        },
        {
            guid: "212720105e1a4605b4d5bc4295a684cd",
            name: "DoomBlade",
            display: "Doom Blade",
            details: "Gain damage for each carried curse",
            rarity: "Legendary",
            crafting: 0,
            cost: 1000,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 4,
                    weight: 1
                }
            }
        },
        {
            guid: "2d5d75f5824242b781e8295d5f25b996",
            name: "BattleAxe",
            display: "Battle Axe",
            details: "Increases swing size,but slightly decreases swing damage",
            rarity: "Common",
            crafting: 0,
            cost: 450,
            extra: "",
            tables: {
                relic: {
                    index: 74,
                    weight: 9
                },
                relicAll: {
                    index: 40,
                    weight: 9
                },
                relicFinal: {
                    index: 23,
                    weight: 9
                }
            }
        },
        {
            guid: "2e1f6f7792eb4409a359778402737ed1",
            name: "Glaive",
            display: "Glaive",
            details: "Increases throw size.",
            rarity: "Common",
            crafting: 26,
            cost: 500,
            extra: "",
            tables: {
                relic: {
                    index: 75,
                    weight: 9
                },
                relicAll: {
                    index: 91,
                    weight: 9
                },
                relicFinal: {
                    index: 24,
                    weight: 9
                }
            }
        },
        {
            guid: "05ad55b489ff4af28e34ab471ecd0640",
            name: "Masa",
            display: "Masa",
            details: "Reduces throw damage and increases swing damage",
            rarity: "Rare",
            crafting: 0,
            cost: 410,
            extra: "",
            tables: {
                relic: {
                    index: 79,
                    weight: 3
                },
                relicAll: {
                    index: 43,
                    weight: 3
                }
            }
        },
        {
            guid: "78d8214111974925b1e2039f20b728cf",
            name: "Mune",
            display: "Mune",
            details: "Reduces swing damage and increases throw damage",
            rarity: "Rare",
            crafting: 1,
            cost: 490,
            extra: "",
            tables: {
                relic: {
                    index: 81,
                    weight: 3
                },
                relicAll: {
                    index: 45,
                    weight: 3
                }
            }
        },
        {
            guid: "c5791c753f7e42de8a2814bd4b17504a",
            name: "Masamune",
            display: "Masamune",
            details: "Instantly kills enemies sometimes",
            rarity: "Legendary",
            crafting: 0,
            cost: 900,
            extra: "Combined from Masa & Mune",
            tables: {}
        },
        {
            guid: "f568bbf4ecb54daf9d7d472f06d97521",
            name: "Suneater",
            display: "Suneater",
            details: "Consumes all current and future blessings and converts them to swing damage",
            rarity: "Legendary",
            crafting: 0,
            cost: 900,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 12,
                    weight: 1
                }
            }
        },
        {
            guid: "e161e4e3083948eaa22f9830394b1235",
            name: "VorpalBlade",
            display: "Vorpal Blade",
            details: "Attack quickly without stopping",
            rarity: "Common",
            crafting: 50,
            cost: 400,
            extra: "Unique Swing",
            tables: {
                relic: {
                    index: 88,
                    weight: 9
                },
                relicAll: {
                    index: 50,
                    weight: 9
                },
                relicFinal: {
                    index: 26,
                    weight: 9
                }
            }
        },
        {
            guid: "66b7f22d45354e549d2a4a18ce9792f7",
            name: "TwistedBlade",
            display: "Twisted Blade",
            details: "Increases critical strike chance for each carried curse",
            rarity: "Common",
            crafting: 30,
            cost: 375,
            extra: "",
            tables: {
                relic: {
                    index: 76,
                    weight: 9
                },
                relicAll: {
                    index: 41,
                    weight: 9
                }
            }
        },
        {
            guid: "2945df6b2ea043dd94c67ba09aefbe2b",
            name: "ObsidianKnife",
            display: "Obsidian Knife",
            details: "Dramatically increases damage,but breaks when hit",
            rarity: "Rare",
            crafting: 0,
            cost: 650,
            extra: "",
            tables: {
                relic: {
                    index: 102,
                    weight: 3
                },
                relicAll: {
                    index: 113,
                    weight: 3
                },
                relicFinal: {
                    index: 30,
                    weight: 3
                }
            }
        },
        {
            guid: "54d1936d55494194a42d56c6f314c763",
            name: "DirksHammer",
            display: "Dirk's Hammer",
            details: "Transmute an item by hitting it",
            rarity: "Rare",
            crafting: 50,
            cost: 500,
            extra: "",
            tables: {
                relic: {
                    index: 90,
                    weight: 3
                },
                relicAll: {
                    index: 86,
                    weight: 3
                },
                relicShop: {
                    index: 37,
                    weight: 3
                }
            }
        },
        {
            guid: "a8d3215241a94555866450ab791bc7e3",
            name: "Resurrection",
            display: "Resurrection",
            details: "Resurrect on death",
            rarity: "Rare",
            crafting: 48,
            cost: 1200,
            extra: "",
            tables: {
                relic: {
                    index: 47,
                    weight: 3
                },
                relicAll: {
                    index: 27,
                    weight: 3
                },
                relicFinal: {
                    index: 12,
                    weight: 6
                }
            }
        },
        {
            guid: "623c929400f44c05b07827fef3426e60",
            name: "GordonsTunic",
            display: "Gordon's Tunic",
            details: "Reduces elemental damage",
            rarity: "Common",
            crafting: 14,
            cost: 280,
            extra: "",
            tables: {
                relic: {
                    index: 61,
                    weight: 9
                },
                relicAll: {
                    index: 95,
                    weight: 9
                },
                relicShop: {
                    index: 21,
                    weight: 9
                }
            }
        },
        {
            guid: "b367a2746211405a8dda8d560f88b6d3",
            name: "Breastplate",
            display: "Breastplate",
            details: "Adds a point of armor to the health bar",
            rarity: "Common",
            crafting: 55,
            cost: 450,
            extra: "",
            tables: {
                relic: {
                    index: 89,
                    weight: 5
                },
                relicAll: {
                    index: 79,
                    weight: 9
                },
                relicFinal: {
                    index: 27,
                    weight: 5
                }
            }
        },
        {
            guid: "53f62e71c29143f79a27abca6069f52b",
            name: "Pauldron",
            display: "Pauldron",
            details: "",
            rarity: "Common",
            crafting: 0,
            cost: 450,
            extra: "",
            tables: {
                relic: {
                    index: 101,
                    weight: 5
                },
                relicAll: {
                    index: 112,
                    weight: 5
                },
                relicShop: {
                    index: 45,
                    weight: 5
                }
            }
        },
        {
            guid: "2f342d2da24340b383d49f1fb9374e5a",
            name: "Gauntlets",
            display: "Gauntlets",
            details: "Adds a point of armor to the health bar",
            rarity: "Common",
            crafting: 35,
            cost: 450,
            extra: "",
            tables: {
                relic: {
                    index: 99,
                    weight: 5
                },
                relicAll: {
                    index: 110,
                    weight: 5
                }
            }
        },
        {
            guid: "e930152d55884ffbb8a0ce9edd6a46f1",
            name: "Greaves",
            display: "Greaves",
            details: "Adds a point of armor to the health bar",
            rarity: "Common",
            crafting: 0,
            cost: 450,
            extra: "",
            tables: {
                relic: {
                    index: 100,
                    weight: 5
                },
                relicAll: {
                    index: 111,
                    weight: 5
                },
                relicShop: {
                    index: 44,
                    weight: 5
                }
            }
        },
        {
            guid: "19dc5130b5404db7a09262d609d9b8ba",
            name: "ShieldofQuills",
            display: "Shield of Quills",
            details: "Gain two points of armor,armor increases damage",
            rarity: "Legendary",
            crafting: 0,
            cost: 770,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 15,
                    weight: 1
                }
            }
        },
        {
            guid: "630bd51306d34a9c9de7b041f1a3caee",
            name: "BlastSuit",
            display: "Blast Suit",
            details: "Invulnerability to friendly bomb blasts and increases bomb damage",
            rarity: "Common",
            crafting: 14,
            cost: 275,
            extra: "",
            tables: {
                relic: {
                    index: 91,
                    weight: 9
                },
                relicAll: {
                    index: 76,
                    weight: 9
                },
                relicShop: {
                    index: 38,
                    weight: 9
                }
            }
        },
        {
            guid: "ca4e94bdc2cc43329474ef40230aca52",
            name: "Pillow",
            display: "Hoodie's Pillow",
            details: "Reduces physical damage",
            rarity: "Rare",
            crafting: 22,
            cost: 350,
            extra: "",
            tables: {
                relic: {
                    index: 21,
                    weight: 3
                },
                relicAll: {
                    index: 11,
                    weight: 3
                },
                relicFinal: {
                    index: 7,
                    weight: 3
                }
            }
        },
        {
            guid: "a1ca0abb4f8c47bbb719be48fb7fd470",
            name: "SoulGuard",
            display: "Soul Guard",
            details: "Reduces and redirects damage to your max HP",
            rarity: "Legendary",
            crafting: 0,
            cost: 850,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 16,
                    weight: 1
                }
            }
        },
        {
            guid: "2a64aa4851c94841ae297322646e6bdc",
            name: "WetBlanket",
            display: "Wet Blanket",
            details: "Puts out fires immediately,but requires water charges",
            rarity: "Common",
            crafting: 0,
            cost: 275,
            extra: "",
            tables: {
                relicAll: {
                    index: 69,
                    weight: 9
                },
                relicShop: {
                    index: 34,
                    weight: 9
                }
            }
        },
        {
            guid: "95c9369deaba40caa44b1b48989a6a17",
            name: "WarPaint",
            display: "War Paint",
            details: "Increase attack damage and speed when killing enemies",
            rarity: "Common",
            crafting: 0,
            cost: 480,
            extra: "",
            tables: {
                relic: {
                    index: 43,
                    weight: 9
                },
                relicAll: {
                    index: 68,
                    weight: 9
                }
            }
        },
        {
            guid: "fd702e9d2662490f886876ee598b15d7",
            name: "Battlestandard",
            display: "Battle Standard",
            details: "Increases move,attack,and throw speed at the beginning of battle",
            rarity: "Common",
            crafting: 0,
            cost: 450,
            extra: "",
            tables: {
                relic: {
                    index: 72,
                    weight: 9
                },
                relicAll: {
                    index: 38,
                    weight: 9
                }
            }
        },
        {
            guid: "6bbe9142f1144e7cac6b0f2edf13cac9",
            name: "Catalyst",
            display: "Catalyst",
            details: "When healed,heal again",
            rarity: "Common",
            crafting: 16,
            cost: 280,
            extra: "",
            tables: {
                relic: {
                    index: 62,
                    weight: 9
                },
                relicAll: {
                    index: 80,
                    weight: 9
                },
                relicShop: {
                    index: 22,
                    weight: 9
                }
            }
        },
        {
            guid: "ecb92c9f921647a69fa3bcd95bb535e7",
            name: "SeltsEgg",
            display: "Selt's Egg",
            details: "Spawn larvae on entrance",
            rarity: "Rare",
            crafting: 15,
            cost: 500,
            extra: "",
            tables: {
                relic: {
                    index: 46,
                    weight: 3
                },
                relicAll: {
                    index: 26,
                    weight: 3
                }
            }
        },
        {
            guid: "5482a1b1b71b433d886865f2394f2fcc",
            name: "ElectrifiedOrb",
            display: "Electrified Orb",
            details: "Orbits the peasant and shocks enemies on contact",
            rarity: "Rare",
            crafting: 30,
            cost: 425,
            extra: "",
            tables: {
                relic: {
                    index: 85,
                    weight: 3
                },
                relicAll: {
                    index: 89,
                    weight: 3
                },
                relicFinal: {
                    index: 25,
                    weight: 3
                }
            }
        },
        {
            guid: "cd5580348c4d4a3cbcba94eafc169f4a",
            name: "OthermineConduit",
            display: "Othermine Conduit",
            details: "Ghastly hands will attack the enemy",
            rarity: "Rare",
            crafting: 55,
            cost: 480,
            extra: "",
            tables: {
                relic: {
                    index: 73,
                    weight: 3
                },
                relicAll: {
                    index: 39,
                    weight: 3
                },
                relicFinal: {
                    index: 22,
                    weight: 3
                }
            }
        },
        {
            guid: "ca58b2a9d6cc4f56ae0699e33578a2e2",
            name: "Doll",
            display: "Doll",
            details: "Blocks the next few curses.",
            rarity: "Common",
            crafting: 22,
            cost: 375,
            extra: "",
            tables: {
                relic: {
                    index: 78,
                    weight: 9
                },
                relicAll: {
                    index: 87,
                    weight: 9
                },
                relicShop: {
                    index: 30,
                    weight: 9
                }
            }
        },
        {
            guid: "d21a2fe3ce9d4fddb34a59dd4df3773f",
            name: "Devotion",
            display: "Devotion",
            details: "Pray twice at altars",
            rarity: "Common",
            crafting: 30,
            cost: 450,
            extra: "",
            tables: {
                relicAll: {
                    index: 85,
                    weight: 9
                },
                relicShop: {
                    index: 16,
                    weight: 9
                }
            }
        },
        {
            guid: "4b36bbc087004750a1526304aef7b088",
            name: "108Beads",
            display: "108 Beads",
            details: "Heal when praying at an altar",
            rarity: "Common",
            crafting: 12,
            cost: 360,
            extra: "",
            tables: {
                relic: {
                    index: 87,
                    weight: 9
                },
                relicAll: {
                    index: 70,
                    weight: 9
                },
                relicShop: {
                    index: 36,
                    weight: 9
                }
            }
        },
        {
            guid: "80242154d4284cc6aab221292cb0ae93",
            name: "HolyGuacamole",
            display: "Holy Guacamole",
            details: "Find more altar rooms",
            rarity: "Rare",
            crafting: 20,
            cost: 375,
            extra: "",
            tables: {
                relic: {
                    index: 94,
                    weight: 2
                },
                relicAll: {
                    index: 97,
                    weight: 3
                }
            }
        },
        {
            guid: "25d89c4cdce0444bb617016d3fa547d0",
            name: "SonicBoom",
            display: "Sonic Boom",
            details: "Throw really fast",
            rarity: "Common",
            crafting: 0,
            cost: 280,
            extra: "",
            tables: {
                relic: {
                    index: 44,
                    weight: 9
                },
                relicAll: {
                    index: 24,
                    weight: 9
                }
            }
        },
        {
            guid: "d8f7d033bec0417ab0b553f3a51a9a7f",
            name: "SewingKit",
            display: "Sewing Kit",
            details: "Keep all your gold when you die",
            rarity: "Rare",
            crafting: 0,
            cost: 750,
            extra: "",
            tables: {
                relic: {
                    index: 39,
                    weight: 3
                },
                relicAll: {
                    index: 22,
                    weight: 3
                },
                relicShop: {
                    index: 14,
                    weight: 3
                }
            }
        },
        {
            guid: "b29ea427f7f64aa3a06c8e19a0495648",
            name: "SimpleChest",
            display: "Simple Chest",
            details: "Overstocks the shop",
            rarity: "Common",
            crafting: 0,
            cost: 250,
            extra: "",
            tables: {
                relic: {
                    index: 32,
                    weight: 9
                },
                relicAll: {
                    index: 18,
                    weight: 9
                },
                relicShop: {
                    index: 9,
                    weight: 9
                }
            }
        },
        {
            guid: "074da99ced7f4993b38cb90df3a27d84",
            name: "MealTicket",
            display: "Meal Ticket",
            details: "Free food at the shop,right now!",
            rarity: "Common",
            crafting: 0,
            cost: 300,
            extra: "",
            tables: {
                relic: {
                    index: 23,
                    weight: 9
                },
                relicAll: {
                    index: 13,
                    weight: 9
                },
                relicShop: {
                    index: 6,
                    weight: 9
                }
            }
        },
        {
            guid: "6774d4be9573481f8e6fa97add614285",
            name: "AdventurersHat",
            display: "Adventurer's Hat",
            details: "",
            rarity: "Common",
            crafting: 20,
            cost: 250,
            extra: "",
            tables: {
                relic: {
                    index: 58,
                    weight: 9
                },
                relicAll: {
                    index: 71,
                    weight: 6
                },
                relicShop: {
                    index: 20,
                    weight: 6
                }
            }
        },
        {
            guid: "376feb7893994baf826df320010a2eae",
            name: "AdventurersWhip",
            display: "Adventurer's Whip",
            details: "",
            rarity: "Rare",
            crafting: 0,
            cost: 475,
            extra: "",
            tables: {
                relic: {
                    index: 57,
                    weight: 3
                },
                relicAll: {
                    index: 33,
                    weight: 3
                }
            }
        },
        {
            guid: "bc3b600bea3d416391e2549c137fff63",
            name: "GoldenIdol",
            display: "Golden Idol",
            details: "Discover more rooms and get rich",
            rarity: "Legendary",
            crafting: 0,
            cost: 725,
            extra: "Combined from Adventurer's Hat & Adventurer's Whip",
            tables: {}
        },
        {
            guid: "d6045725bae4407ea8492ff1e4fa7c3f",
            name: "TotemOfLife",
            display: "Totem of Life",
            details: "Sustain yourself through adventure",
            rarity: "Common",
            crafting: 0,
            cost: 550,
            extra: "",
            tables: {
                relic: {
                    index: 34,
                    weight: 9
                },
                relicAll: {
                    index: 19,
                    weight: 9
                }
            }
        },
        {
            guid: "fe3df61649f84dd2b08492c1788d92af",
            name: "AphoticCharm",
            display: "Aphotic Charm",
            details: "Heal in each new room for each curse",
            rarity: "Common",
            crafting: 18,
            cost: 0,
            extra: "",
            tables: {
                relic: {
                    index: 71,
                    weight: 9
                },
                relicAll: {
                    index: 72,
                    weight: 9
                },
                relicShop: {
                    index: 28,
                    weight: 9
                }
            }
        },
        {
            guid: "2380817a345d4458b5630768a38f35a1",
            name: "DillonsClaw",
            display: "Dillon's Claw",
            details: "Deal even more damage when you critical strike",
            rarity: "Common",
            crafting: 0,
            cost: 350,
            extra: "",
            tables: {
                relic: {
                    index: 25,
                    weight: 9
                },
                relicAll: {
                    index: 15,
                    weight: 9
                },
                relicFinal: {
                    index: 9,
                    weight: 18
                }
            }
        },
        {
            guid: "6910c28b900043d48911f9ae27e343cf",
            name: "ShadowsFang",
            display: "Shadow's Fang",
            details: "Higher chance to critical strike",
            rarity: "Common",
            crafting: 10,
            cost: 350,
            extra: "",
            tables: {
                relic: {
                    index: 24,
                    weight: 9
                },
                relicAll: {
                    index: 14,
                    weight: 9
                },
                relicFinal: {
                    index: 8,
                    weight: 18
                }
            }
        },
        {
            guid: "815f242a079240b8833a32c5f408e03a",
            name: "BrambleVest",
            display: "Bramble Vest",
            details: "Return damage but amplified",
            rarity: "Common",
            crafting: 0,
            cost: 200,
            extra: "",
            tables: {
                relic: {
                    index: 26,
                    weight: 9
                },
                relicAll: {
                    index: 16,
                    weight: 9
                },
                relicShop: {
                    index: 29,
                    weight: 9
                }
            }
        },
        {
            guid: "be05dceb707e415ca9224898a15bd1d3",
            name: "Duplicator",
            display: "Duplicator",
            details: "Relic rooms present a tantalizing choice",
            rarity: "Rare",
            crafting: 26,
            cost: 600,
            extra: "",
            tables: {
                relic: {
                    index: 31,
                    weight: 3
                },
                relicAll: {
                    index: 88,
                    weight: 3
                },
                relicShop: {
                    index: 8,
                    weight: 3
                }
            }
        },
        {
            guid: "87447b9566774ef486aa065a51a2bf4e",
            name: "Hyperstone",
            display: "Hyperstone",
            details: "Increase attack speed",
            rarity: "Rare",
            crafting: 45,
            cost: 510,
            extra: "",
            tables: {
                relic: {
                    index: 37,
                    weight: 3
                },
                relicAll: {
                    index: 99,
                    weight: 3
                },
                relicFinal: {
                    index: 10,
                    weight: 18
                }
            }
        },
        {
            guid: "262277e1e3914d1aae80a2d9f5acb3bd",
            name: "MinersFlask",
            display: "Miner's Flask",
            details: "Feel the effects of a potion for longer",
            rarity: "Common",
            crafting: 0,
            cost: 375,
            extra: "",
            tables: {
                relic: {
                    index: 36,
                    weight: 9
                },
                relicAll: {
                    index: 21,
                    weight: 9
                },
                relicShop: {
                    index: 13,
                    weight: 9
                }
            }
        },
        {
            guid: "1e47701bb3324ddfb2c097dda2506453",
            name: "Lunchbox",
            display: "Lunchbox",
            details: "Store a piece of food for later",
            rarity: "Common",
            crafting: 0,
            cost: 380,
            extra: "",
            tables: {
                relic: {
                    index: 80,
                    weight: 9
                },
                relicAll: {
                    index: 44,
                    weight: 9
                },
                relicShop: {
                    index: 32,
                    weight: 9
                }
            }
        },
        {
            guid: "2725a7b0032447a98b7604d29395317a",
            name: "Immolate",
            display: "Large Ember",
            details: "",
            rarity: "Rare",
            crafting: 20,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 29,
                    weight: 3
                },
                relicAll: {
                    index: 100,
                    weight: 3
                }
            }
        },
        {
            guid: "70965440d15240d1a7ac7c8ddff4c9b2",
            name: "ItemPopcorn",
            display: "Popcorn",
            details: "Items will sometimes duplicate themselves",
            rarity: "Common",
            crafting: 16,
            cost: 650,
            extra: "",
            tables: {
                relicAll: {
                    index: 102,
                    weight: 9
                },
                relicShop: {
                    index: 10,
                    weight: 9
                }
            }
        },
        {
            guid: "6b18a3a60fe342f1833aff1526898e11",
            name: "GoldPopcorn",
            display: "Golden Popcorn",
            details: "Gold will sometimes duplicate itself",
            rarity: "Common",
            crafting: 0,
            cost: 550,
            extra: "",
            tables: {
                relic: {
                    index: 35,
                    weight: 9
                },
                relicAll: {
                    index: 20,
                    weight: 9
                },
                relicShop: {
                    index: 11,
                    weight: 9
                },
                relicStarter: {
                    index: 3,
                    weight: 9
                }
            }
        },
        {
            guid: "81b81569168949aeaea9412aea00601d",
            name: "FoodPopcorn",
            display: "Seasoned Popcorn",
            details: "Food will sometimes duplicate itself",
            rarity: "Common",
            crafting: 0,
            cost: 500,
            extra: "",
            tables: {
                relicAll: {
                    index: 55,
                    weight: 9
                },
                relicShop: {
                    index: 12,
                    weight: 9
                }
            }
        },
        {
            guid: "586b91a55c884c48832f9503dd8947c2",
            name: "CaramelPopcorn",
            display: "Caramel Popcorn",
            details: "Duplicated food packs a surprise",
            rarity: "Legendary",
            crafting: 0,
            cost: 1100,
            extra: "Combined from Golden Popcorn & Seasoned Popcorn",
            tables: {}
        },
        {
            guid: "ebb2f31ddd77460196d44fabcd18f57a",
            name: "PocketGrill",
            display: "Pocket Grill",
            details: "Cooks all your food",
            rarity: "Common",
            crafting: 0,
            cost: 500,
            extra: "",
            tables: {
                relicAll: {
                    index: 65,
                    weight: 9
                },
                relicShop: {
                    index: 17,
                    weight: 9
                }
            }
        },
        {
            guid: "6851f6a8812f4bcbabaa9a2414ec70d5",
            name: "Leftovers",
            display: "Leftovers",
            details: "Find old, gross food in chests",
            rarity: "Common",
            crafting: 0,
            cost: 475,
            extra: "",
            tables: {
                relic: {
                    index: 27,
                    weight: 9
                },
                relicAll: {
                    index: 61,
                    weight: 9
                },
                relicShop: {
                    index: 7,
                    weight: 9
                }
            }
        },
        {
            guid: "ed388fc9c09943bc987cf1c3388e8755",
            name: "SpareOrdinance",
            display: "Spare Ordnance",
            details: "Discover a bomb in every chest",
            rarity: "Common",
            crafting: 0,
            cost: 450,
            extra: "",
            tables: {
                relic: {
                    index: 28,
                    weight: 9
                },
                relicAll: {
                    index: 108,
                    weight: 9
                },
                relicShop: {
                    index: 43,
                    weight: 9
                }
            }
        },
        {
            guid: "f7eca5455bdf49fe9d2dafd4ec32d1e7",
            name: "Miniaturizer",
            display: "Miniaturizer",
            details: "Find small boxes in big boxes",
            rarity: "Legendary",
            crafting: 0,
            cost: 850,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 7,
                    weight: 1
                }
            }
        },
        {
            guid: "5abbafb002b04ee495f179afdb550ffa",
            name: "KeyDoubler",
            display: "Key Doubler",
            details: "Sometimes drop a new key when using an old key",
            rarity: "Common",
            crafting: 0,
            cost: 480,
            extra: "",
            tables: {
                relicAll: {
                    index: 58,
                    weight: 9
                },
                relicShop: {
                    index: 4,
                    weight: 9
                }
            }
        },
        {
            guid: "e56c7298c19e47d990140eceb14b95cc",
            name: "BombDoubler",
            display: "Bomb Doubler",
            details: "Sometimes drop a new bomb when using an old bomb",
            rarity: "Common",
            crafting: 18,
            cost: 500,
            extra: "",
            tables: {
                relicAll: {
                    index: 78,
                    weight: 9
                },
                relicShop: {
                    index: 5,
                    weight: 9
                }
            }
        },
        {
            guid: "fb374cc41c744cdbbbe227889cf001c4",
            name: "DoubleDoubler",
            display: "Double Doubler",
            details: "Chance to drop a key and bomb when using either",
            rarity: "Legendary",
            crafting: 0,
            cost: 980,
            extra: "Combined from Key Doubler & Bomb Doubler",
            tables: {}
        },
        {
            guid: "ec20d69533674c59a1af67db438bf172",
            name: "PilfersGift",
            display: "Pilfer's Gift",
            details: "Be blessed with two gifts from the pilfers",
            rarity: "Rare",
            crafting: 99,
            cost: 900,
            extra: "",
            tables: {
                relic: {
                    index: 30,
                    weight: 3
                },
                relicAll: {
                    index: 17,
                    weight: 3
                }
            }
        },
        {
            guid: "cad1d7d1cd454671ac62d6496c5aa49e",
            name: "GoldenBombs",
            display: "Golden Powder",
            details: "Turns rock into gold",
            rarity: "Common",
            crafting: 15,
            cost: 750,
            extra: "Unique Bomb",
            tables: {
                relic: {
                    index: 0,
                    weight: 9
                },
                relicAll: {
                    index: 92,
                    weight: 9
                }
            }
        },
        {
            guid: "82d1d9ec3cb74d019e07ac5750e5433d",
            name: "ClusterBombs",
            display: "Bombushka",
            details: "Bombs, in bombs, in bombs",
            rarity: "Common",
            crafting: 0,
            cost: 400,
            extra: "Unique Bomb",
            tables: {
                relic: {
                    index: 1,
                    weight: 9
                },
                relicAll: {
                    index: 0,
                    weight: 9
                },
                relicStarter: {
                    index: 2,
                    weight: 9
                }
            }
        },
        {
            guid: "04579544c0354d24a712f465b0a4a504",
            name: "IncendiaryBombs",
            display: "Seer's Blood",
            details: "Bombs explode in a shower of fire",
            rarity: "Common",
            crafting: 0,
            cost: 350,
            extra: "Unique Bomb",
            tables: {
                relic: {
                    index: 2,
                    weight: 9
                },
                relicAll: {
                    index: 1,
                    weight: 9
                }
            }
        },
        {
            guid: "96b62be9e4f04a329eed69ab143957aa",
            name: "RookBombs",
            display: "Rook's Bomb",
            details: "Death at ninety degrees",
            rarity: "Common",
            crafting: 0,
            cost: 480,
            extra: "Unique Bomb",
            tables: {
                relic: {
                    index: 3,
                    weight: 9
                },
                relicAll: {
                    index: 2,
                    weight: 9
                }
            }
        },
        {
            guid: "80c079e5b87345b28557d545c6f0131e",
            name: "BishopBombs",
            display: "Bishop's Bomb",
            details: "Death at forty five degrees",
            rarity: "Common",
            crafting: 8,
            cost: 470,
            extra: "Unique Bomb",
            tables: {
                relic: {
                    index: 38,
                    weight: 9
                },
                relicAll: {
                    index: 75,
                    weight: 9
                }
            }
        },
        {
            guid: "78622bf8ccfb4b6b8f4ad11165615e88",
            name: "QueenBombs",
            display: "Queen's Bomb",
            details: "Death in all directions",
            rarity: "Legendary",
            crafting: 0,
            cost: 950,
            extra: "Unique Bomb\nCombined from Rook's Bomb & Bishop's Bomb",
            tables: {}
        },
        {
            guid: "079a976e3dd24ea8819941b9f81259c2",
            name: "TransmutagenBombs",
            display: "Transmutagen Blast",
            details: "Transforms items",
            rarity: "Legendary",
            crafting: 0,
            cost: 1111,
            extra: "Unique Bomb",
            tables: {
                relicLegendary: {
                    index: 13,
                    weight: 1
                }
            }
        },
        {
            guid: "01dd414291604477aa1405b5683a29a3",
            name: "BrandingBombs",
            display: "Branding Bomb",
            details: "Bombs brand enemies for sacrifice, +10 bombs",
            rarity: "Legendary",
            crafting: 0,
            cost: 666,
            extra: "Unique Bomb",
            tables: {
                relicLegendary: {
                    index: 11,
                    weight: 1
                }
            }
        },
        {
            guid: "0948c27e6bf3483292c1e2e065499018",
            name: "LightningBombs",
            display: "Lightning Bomb",
            details: "Bomb explosions chain lightning",
            rarity: "Common",
            crafting: 0,
            cost: 350,
            extra: "Unique Bomb",
            tables: {
                relic: {
                    index: 4,
                    weight: 9
                },
                relicAll: {
                    index: 62,
                    weight: 9
                }
            }
        },
        {
            guid: "f3fc59fe276e4b5eb28425f43940c0f8",
            name: "MidasBombs",
            display: "M.E.G.A. Bomb",
            details: "A mess of electrified gold",
            rarity: "Legendary",
            crafting: 0,
            cost: 0,
            extra: "Combined from Lightning Bomb & Golden Powder",
            tables: {}
        },
        {
            guid: "5e270234064d40d08b17881eee751dfd",
            name: "BloodBomb",
            display: "Blood Bomb",
            details: "Leeches life from enemies slain by bombs",
            rarity: "Common",
            crafting: 10,
            cost: 430,
            extra: "Unique Bomb",
            tables: {
                relic: {
                    index: 93,
                    weight: 9
                },
                relicAll: {
                    index: 77,
                    weight: 9
                }
            }
        },
        {
            guid: "7a06da12309d4136917c71be7772e055",
            name: "TsarBomba",
            display: "Tsar Bomba",
            details: "Killing enemies with a bomb spawns a new bomb. Carried bombs decrease swing and throw damage.",
            rarity: "Legendary",
            crafting: 0,
            cost: 875,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 14,
                    weight: 1
                }
            }
        },
        {
            guid: "c3cf34b72ca743f7986c53215ec3a358",
            name: "U235",
            display: "U-235",
            details: "Bomb damage is proportional to the number of carried bombs, +5 bombs",
            rarity: "Rare",
            crafting: 60,
            cost: 560,
            extra: "",
            tables: {
                relic: {
                    index: 84,
                    weight: 3
                },
                relicAll: {
                    index: 48,
                    weight: 3
                }
            }
        },
        {
            guid: "8c781614f3e545cd9dc53a1862f87dc7",
            name: "Shrapnel",
            display: "Shrapnel",
            details: "Friendly bomb blasts fire projectiles",
            rarity: "Common",
            crafting: 0,
            cost: 310,
            extra: "",
            tables: {
                relic: {
                    index: 111,
                    weight: 9
                },
                relicAll: {
                    index: 122,
                    weight: 9
                },
                relicShop: {
                    index: 52,
                    weight: 9
                }
            }
        },
        {
            guid: "3640d085d4624902a191cefbacabd840",
            name: "GeckoBlast",
            display: "Gecko Blast",
            details: "Bomb blasts attract items",
            rarity: "Common",
            crafting: 0,
            cost: 500,
            extra: "",
            tables: {
                relic: {
                    index: 97,
                    weight: 1
                },
                relicAll: {
                    index: 107,
                    weight: 1
                },
                relicShop: {
                    index: 42,
                    weight: 9
                }
            }
        },
        {
            guid: "fd98fd90983c49f49e88267708a16807",
            name: "CaptureSphere",
            display: "Capture Sphere",
            details: "Bomb kills permanently increase bomb damage",
            rarity: "Common",
            crafting: 0,
            cost: 285,
            extra: "",
            tables: {
                relicShop: {
                    index: 47,
                    weight: 9
                }
            }
        },
        {
            guid: "a1231c3c35814d68aaae8d98cc882fd9",
            name: "RemoteDetonator",
            display: "Remote Detonator",
            details: "Detonate bombs when you feel like it",
            rarity: "Rare",
            crafting: 30,
            cost: 375,
            extra: "",
            tables: {
                relic: {
                    index: 82,
                    weight: 3
                },
                relicAll: {
                    index: 46,
                    weight: 3
                },
                relicShop: {
                    index: 33,
                    weight: 3
                }
            }
        },
        {
            guid: "403c20cf86844b8ba5a495752f890817",
            name: "ShortWicks",
            display: "Short Wicks",
            details: "Reduces the bomb cooldown",
            rarity: "Common",
            crafting: 20,
            cost: 225,
            extra: "",
            tables: {
                relicShop: {
                    index: 46,
                    weight: 9
                }
            }
        },
        {
            guid: "724a50c9ac524f9fb3f527a5052e02a6",
            name: "Guantes",
            display: "Guantes",
            details: "Throw that pickaxe a bit harder",
            rarity: "Common",
            crafting: 10,
            cost: 500,
            extra: "",
            tables: {
                relic: {
                    index: 11,
                    weight: 9
                },
                relicAll: {
                    index: 96,
                    weight: 9
                },
                relicFinal: {
                    index: 3,
                    weight: 9
                }
            }
        },
        {
            guid: "1808d1da72b540c1a611a560f5f89fb3",
            name: "SequenceBreaker",
            display: "Sequence Breaker",
            details: "Teleport to your pickaxe",
            rarity: "Common",
            crafting: 26,
            cost: 500,
            extra: "Unique Throw",
            tables: {
                relic: {
                    index: 68,
                    weight: 9
                },
                relicAll: {
                    index: 37,
                    weight: 9
                },
                relicShop: {
                    index: 27,
                    weight: 9
                }
            }
        },
        {
            guid: "67aea971b4214697bb0cf4bdc4e904aa",
            name: "ThrowingStar",
            display: "Throwing Star",
            details: "Thrown pickaxe penetrates enemies and objects",
            rarity: "Common",
            crafting: 16,
            cost: 350,
            extra: "",
            tables: {
                relic: {
                    index: 86,
                    weight: 9
                },
                relicAll: {
                    index: 49,
                    weight: 9
                }
            }
        },
        {
            guid: "b4e5f598694c439d8260e8539e0320b2",
            name: "Guidance",
            display: "Guidance",
            details: "400",
            rarity: "Common",
            crafting: 0,
            cost: 400,
            extra: "Unique Throw",
            tables: {
                relic: {
                    index: 9,
                    weight: 9
                },
                relicAll: {
                    index: 6,
                    weight: 9
                },
                relicFinal: {
                    index: 1,
                    weight: 9
                },
                relicStarter: {
                    index: 4,
                    weight: 9
                }
            }
        },
        {
            guid: "01e0ef72372d4531a4a1cdb3cc265f97",
            name: "PhantasmalAxe",
            display: "Phantasmal Axe",
            details: "Thrown pickaxes duplicate themselves",
            rarity: "Common",
            crafting: 0,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 95,
                    weight: 9
                },
                relicAll: {
                    index: 63,
                    weight: 9
                },
                relicStarter: {
                    index: 5,
                    weight: 9
                }
            }
        },
        {
            guid: "830216e9492c484489ef90c303f07b68",
            name: "Chakram",
            display: "Chakram",
            details: "Throw a whirling blade of death",
            rarity: "Legendary",
            crafting: 0,
            cost: 800,
            extra: "Unique Throw",
            tables: {
                relicLegendary: {
                    index: 1,
                    weight: 1
                }
            }
        },
        {
            guid: "48f2bb8ba1f742ca830edfaa91772625",
            name: "Fork",
            display: "Fork",
            details: "Splits your ranged attacks",
            rarity: "Rare",
            crafting: 0,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 104,
                    weight: 3
                },
                relicAll: {
                    index: 115,
                    weight: 3
                },
                relicStarter: {
                    index: 8,
                    weight: 1
                }
            }
        },
        {
            guid: "b6f58486915b43b8bcd0004d74f9182b",
            name: "BottledLightning",
            display: "Bottled Lightning",
            details: "Chance on hit to chain lightning",
            rarity: "Common",
            crafting: 0,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 7,
                    weight: 9
                },
                relicAll: {
                    index: 4,
                    weight: 9
                },
                relicFinal: {
                    index: 0,
                    weight: 9
                },
                relicStarter: {
                    index: 0,
                    weight: 9
                }
            }
        },
        {
            guid: "efa267f58ead4081a7c8d7769a5e6bf8",
            name: "SalamanderTail",
            display: "Salamander Tail",
            details: "Chance on hit to ignite your enemies",
            rarity: "Common",
            crafting: 0,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 8,
                    weight: 9
                },
                relicAll: {
                    index: 5,
                    weight: 9
                },
                relicStarter: {
                    index: 7,
                    weight: 9
                }
            }
        },
        {
            guid: "aede3a51037549b9b0eeeec881d5168e",
            name: "CripplingPoison",
            display: "Crippling Poison",
            details: "Chance on hit to poison your enemies",
            rarity: "Common",
            crafting: 14,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 64,
                    weight: 9
                },
                relicAll: {
                    index: 83,
                    weight: 9
                }
            }
        },
        {
            guid: "e25c4adfa3e04022ae18673db8f83276",
            name: "CausticVial",
            display: "Caustic Vial",
            details: "Enemies hit with the thrown pickaxe explode on death",
            rarity: "Common",
            crafting: 24,
            cost: 375,
            extra: "",
            tables: {
                relic: {
                    index: 92,
                    weight: 9
                },
                relicAll: {
                    index: 81,
                    weight: 9
                }
            }
        },
        {
            guid: "0c33fc50f8d94d518803789c0b7f2185",
            name: "CrackedOrb",
            display: "Cracked Orb",
            details: "Curse enemies with increased damage",
            rarity: "Rare",
            crafting: 0,
            cost: 460,
            extra: "",
            tables: {
                relic: {
                    index: 15,
                    weight: 3
                },
                relicAll: {
                    index: 9,
                    weight: 9
                },
                relicFinal: {
                    index: 5,
                    weight: 3
                }
            }
        },
        {
            guid: "9fcfbe4652be48ec82ea6a8431a18d37",
            name: "UrsineRing",
            display: "Ursine Ring",
            details: "Increase health",
            rarity: "Common",
            crafting: 0,
            cost: 500,
            extra: "",
            tables: {
                relic: {
                    index: 10,
                    weight: 9
                },
                relicAll: {
                    index: 67,
                    weight: 9
                },
                relicFinal: {
                    index: 2,
                    weight: 9
                }
            }
        },
        {
            guid: "29799d6270d24f018cef3d360eebc5e7",
            name: "DemonRing",
            display: "Demon Ring",
            details: "Increase swing damage",
            rarity: "Common",
            crafting: 0,
            cost: 500,
            extra: "",
            tables: {
                relic: {
                    index: 12,
                    weight: 9
                },
                relicAll: {
                    index: 7,
                    weight: 9
                },
                relicFinal: {
                    index: 4,
                    weight: 18
                }
            }
        },
        {
            guid: "651c313904884b19afcd5a1da136c01c",
            name: "MediocreRing",
            display: "Mediocre Ring",
            details: "Increases health and damage",
            rarity: "Common",
            crafting: 8,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 63,
                    weight: 9
                },
                relicAll: {
                    index: 35,
                    weight: 9
                },
                relicFinal: {
                    index: 20,
                    weight: 9
                }
            }
        },
        {
            guid: "3693999de5e94fcd81b5fcd53c13e8b4",
            name: "BerserkerPendant",
            display: "Berserker's Pendant",
            details: "Deal more swing damage at low health",
            rarity: "Common",
            crafting: 20,
            cost: 420,
            extra: "",
            tables: {
                relic: {
                    index: 16,
                    weight: 9
                },
                relicAll: {
                    index: 74,
                    weight: 9
                },
                relicFinal: {
                    index: 6,
                    weight: 9
                }
            }
        },
        {
            guid: "2fe62c4bfc084a7a8516c18f23575fb3",
            name: "AxeThrowersPendant",
            display: "Axe Thrower's Pendant",
            details: "Deal more throw damage at low health",
            rarity: "Common",
            crafting: 0,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 59,
                    weight: 9
                },
                relicAll: {
                    index: 34,
                    weight: 9
                },
                relicFinal: {
                    index: 18,
                    weight: 9
                }
            }
        },
        {
            guid: "10444b01cc944bdc92bbc183ecfd4dfe",
            name: "KnightPendant",
            display: "Knight's Pendant",
            details: "Deal more swing damage at high health",
            rarity: "Common",
            crafting: 0,
            cost: 420,
            extra: "",
            tables: {
                relic: {
                    index: 53,
                    weight: 9
                },
                relicAll: {
                    index: 59,
                    weight: 9
                },
                relicFinal: {
                    index: 15,
                    weight: 9
                }
            }
        },
        {
            guid: "77af6531c8294f249cf55fd69c74bd8a",
            name: "ArchersPendant",
            display: "Archer's Pendant",
            details: "Deal more throw damage at high health",
            rarity: "Common",
            crafting: 20,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 60,
                    weight: 9
                },
                relicAll: {
                    index: 73,
                    weight: 9
                },
                relicFinal: {
                    index: 19,
                    weight: 9
                }
            }
        },
        {
            guid: "e790a903a95240ffa6ff75f0c17475cd",
            name: "IronBranch",
            display: "Iron Branch",
            details: "Increase health, swing damage, and attack speed",
            rarity: "Common",
            crafting: 0,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 49,
                    weight: 9
                },
                relicAll: {
                    index: 29,
                    weight: 9
                },
                relicFinal: {
                    index: 13,
                    weight: 9
                }
            }
        },
        {
            guid: "e21cf8a29a6b4277b40ba59cb04c299b",
            name: "CrownQueens",
            display: "Queen's Crown",
            details: "Increase throw damage, swing size, and swing speed",
            rarity: "Rare",
            crafting: 0,
            cost: 550,
            extra: "",
            tables: {
                relic: {
                    index: 54,
                    weight: 3
                },
                relicAll: {
                    index: 31,
                    weight: 3
                },
                relicFinal: {
                    index: 16,
                    weight: 6
                }
            }
        },
        {
            guid: "0248a19ceeb042c096a827dbcb5b10de",
            name: "CrownKings",
            display: "King's Crown",
            details: "Increase swing damage, throw size, and throw speed",
            rarity: "Rare",
            crafting: 26,
            cost: 550,
            extra: "",
            tables: {
                relic: {
                    index: 55,
                    weight: 3
                },
                relicAll: {
                    index: 84,
                    weight: 3
                }
            }
        },
        {
            guid: "5efb8642758041cfb29b8555ce405f41",
            name: "CrownEmperors",
            display: "Emperor's Crown",
            details: "Increases stats and receive a blessing",
            rarity: "Legendary",
            crafting: 0,
            cost: 1100,
            extra: "Combined from Queen's Crown & King's Crown",
            tables: {}
        },
        {
            guid: "6e31da144f9b4820a3442e42883a52e5",
            name: "PilferRing",
            display: "Pilfer Ring",
            details: "Soak up gold and get a discount at the shop",
            rarity: "Common",
            crafting: 0,
            cost: 800,
            extra: "",
            tables: {
                relicAll: {
                    index: 64,
                    weight: 9
                },
                relicShop: {
                    index: 0,
                    weight: 9
                }
            }
        },
        {
            guid: "7c1a74b4bc5e4398b2a10459f9b50b21",
            name: "UnstableConcoction",
            display: "Unstable Concoction",
            details: "Gold hits the floor with explosive force",
            rarity: "Common",
            crafting: 0,
            cost: 420,
            extra: "",
            tables: {
                relic: {
                    index: 33,
                    weight: 9
                },
                relicAll: {
                    index: 66,
                    weight: 9
                }
            }
        },
        {
            guid: "9c707dd6871a44b7b7326ad378f41a38",
            name: "GoldTooth",
            display: "Gold Tooth",
            details: "Sustain yourself on gold",
            rarity: "Common",
            crafting: 15,
            cost: 600,
            extra: "",
            tables: {
                relic: {
                    index: 20,
                    weight: 9
                },
                relicAll: {
                    index: 94,
                    weight: 9
                }
            }
        },
        {
            guid: "ebe6a743ac76455ea4771e300ebc0b7b",
            name: "GoldenDelicious",
            display: "Golden Delicious",
            details: "All food is golden and extra delicious",
            rarity: "Common",
            crafting: 8,
            cost: 150,
            extra: "",
            tables: {
                relicAll: {
                    index: 93,
                    weight: 9
                },
                relicShop: {
                    index: 3,
                    weight: 9
                }
            }
        },
        {
            guid: "277d2316237d49109d6d1439f7df6e14",
            name: "Conductor",
            display: "Conductor",
            details: "Electrify your enemies when picking up gold",
            rarity: "Common",
            crafting: 0,
            cost: 550,
            extra: "",
            tables: {
                relic: {
                    index: 19,
                    weight: 9
                },
                relicAll: {
                    index: 10,
                    weight: 9
                }
            }
        },
        {
            guid: "0533edf2633049baa08a73d7ba5ef518",
            name: "GoldFrenzy",
            display: "Gold Frenzy",
            details: "Gain temporary damage when picking up gold",
            rarity: "Common",
            crafting: 0,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 45,
                    weight: 9
                },
                relicAll: {
                    index: 25,
                    weight: 9
                }
            }
        },
        {
            guid: "7c3dcc99d36d4f6f8bcc2524ecdb93e8",
            name: "Intensifier",
            display: "Intensifier",
            details: "Increases damage when killing enemies",
            rarity: "Common",
            crafting: 0,
            cost: 500,
            extra: "",
            tables: {
                relic: {
                    index: 14,
                    weight: 9
                },
                relicAll: {
                    index: 8,
                    weight: 9
                }
            }
        },
        {
            guid: "a596ffca42664024be1aeba28ad46f24",
            name: "SkullShield",
            display: "Floating Skull",
            details: "A shield that blocks projectiles, most of the time",
            rarity: "Rare",
            crafting: 0,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 40,
                    weight: 3
                },
                relicAll: {
                    index: 23,
                    weight: 3
                },
                relicStarter: {
                    index: 6,
                    weight: 9
                }
            }
        },
        {
            guid: "23ed5e24dd3c420eacbf5c006e61be87",
            name: "ReflectProjectiles",
            display: "Grimhilde's Mirror",
            details: "Return projectiles with an attack",
            rarity: "Common",
            crafting: 0,
            cost: 350,
            extra: "",
            tables: {
                relic: {
                    index: 22,
                    weight: 9
                },
                relicAll: {
                    index: 12,
                    weight: 9
                }
            }
        },
        {
            guid: "db4baf760be740b99ff679a838ee3ee4",
            name: "MirrorShield",
            display: "Mirror Shield",
            details: "Automatically reflect projectiles",
            rarity: "Legendary",
            crafting: 0,
            cost: 750,
            extra: "Combined from Floating Skull & Grimhilde's Mirror",
            tables: {}
        },
        {
            guid: "91f466ecbb87497b943eabd77f6e4681",
            name: "HungrySpirit",
            display: "Hungry Ghost",
            details: "Leach the life of your enemies",
            rarity: "Rare",
            crafting: 25,
            cost: 480,
            extra: "",
            tables: {
                relic: {
                    index: 13,
                    weight: 3
                },
                relicAll: {
                    index: 98,
                    weight: 3
                }
            }
        },
        {
            guid: "dd44a1f545ad48cda6d653cb6b5eaafb",
            name: "NullStone",
            display: "Nullstone",
            details: "Block a hit once in a while",
            rarity: "Legendary",
            crafting: 0,
            cost: 650,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 8,
                    weight: 1
                }
            }
        },
        {
            guid: "35ccd3bee9604d10988601bfecb53a3a",
            name: "Mushroom",
            display: "Mushroom",
            details: "Gain maximum health when killing enemies",
            rarity: "Legendary",
            crafting: 0,
            cost: 540,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 9,
                    weight: 1
                }
            }
        },
        {
            guid: "eaf60a76dda742928cdd8f75d3e22eca",
            name: "Clover",
            display: "Four Leaf Clover",
            details: "Hit the gold right out of your enemies' pockets",
            rarity: "Rare",
            crafting: 22,
            cost: 525,
            extra: "",
            tables: {
                relic: {
                    index: 18,
                    weight: 3
                },
                relicAll: {
                    index: 82,
                    weight: 3
                },
                relicShop: {
                    index: 2,
                    weight: 3
                }
            }
        },
        {
            guid: "69994ce940d94e439ab01d04a9c176e7",
            name: "Tent",
            display: "Tent",
            details: "Adds a tent to the starting room of a floor, one use only",
            rarity: "Common",
            crafting: 0,
            cost: 300,
            extra: "",
            tables: {
                relic: {
                    index: 77,
                    weight: 9
                },
                relicAll: {
                    index: 42,
                    weight: 9
                },
                relicShop: {
                    index: 39,
                    weight: 9
                }
            }
        },
        {
            guid: "56fb37c63e434aa08fa3c868c3c4d9c3",
            name: "Aegis",
            display: "Aegis",
            details: "Increase defense at critical health",
            rarity: "Common",
            crafting: 0,
            cost: 350,
            extra: "",
            tables: {
                relic: {
                    index: 56,
                    weight: 9
                },
                relicAll: {
                    index: 32,
                    weight: 9
                },
                relicShop: {
                    index: 19,
                    weight: 9
                },
                relicFinal: {
                    index: 17,
                    weight: 9
                }
            }
        },
        {
            guid: "fdf3edb47a594d0f870acabb1d82d433",
            name: "Map",
            display: "Map",
            details: "Get a peep at your surroundings",
            rarity: "Rare",
            crafting: 20,
            cost: 250,
            extra: "",
            tables: {
                relic: {
                    index: 17,
                    weight: 3
                },
                relicAll: {
                    index: 106,
                    weight: 3
                },
                relicShop: {
                    index: 1,
                    weight: 3
                }
            }
        },
        {
            guid: "d537cbb8584b4a3fbe45f0ceef4f2ef1",
            name: "PetrifiedRock",
            display: "Petrified Rock",
            details: "Increase drop rate of items from rocks",
            rarity: "Rare",
            crafting: 0,
            cost: 999,
            extra: "",
            tables: {}
        },
        {
            guid: "3776afb876a74e50911b6d3080f0388d",
            name: "RatBond",
            display: "Rat Bond",
            details: "Become charming to rats",
            rarity: "Rare",
            crafting: 15,
            cost: 250,
            extra: "",
            tables: {
                relic: {
                    index: 51,
                    weight: 3
                },
                relicAll: {
                    index: 30,
                    weight: 3
                }
            }
        },
        {
            guid: "97fbd863c09b44fa9605e675e7275f85",
            name: "CosmicEgg",
            display: "Cosmic Egg",
            details: "Increases experience gain for a familiar",
            rarity: "Rare",
            crafting: 0,
            cost: 750,
            extra: "",
            tables: {
                relic: {
                    index: 65,
                    weight: 3
                },
                relicAll: {
                    index: 36,
                    weight: 3
                },
                relicShop: {
                    index: 23,
                    weight: 3
                }
            }
        },
        {
            guid: "3d321813e7904a1486d6243defa59cc3",
            name: "BirthingPod",
            display: "Birthing Pod",
            details: "Consumes all healing until birth",
            rarity: "Rare",
            crafting: 50,
            cost: 1000,
            extra: "",
            tables: {
                relic: {
                    index: 103,
                    weight: 3
                },
                relicAll: {
                    index: 114,
                    weight: 3
                },
                relicShop: {
                    index: 50,
                    weight: 3
                }
            }
        },
        {
            guid: "898d87f98b184697ac89672f9bf955e4",
            name: "CreditCardSilver",
            display: "Pilfer Credit Card Silver",
            details: "A Gold10.png 2,500 limit at 0% interest",
            rarity: "Common",
            crafting: 0,
            cost: 1,
            extra: "",
            tables: {
                relicAll: {
                    index: 53,
                    weight: 3
                },
                relicShop: {
                    index: 24,
                    weight: 9
                }
            }
        },
        {
            guid: "f83c843bf28e48afbb6f3aec7d5d0eed",
            name: "CreditCardGold",
            display: "Pilfer Credit Card Gold",
            details: "A Gold10.png 5,000 limit at 0% interest",
            rarity: "Common",
            crafting: 0,
            cost: 1,
            extra: "",
            tables: {
                relicAll: {
                    index: 52,
                    weight: 1
                },
                relicShop: {
                    index: 41,
                    weight: 1
                }
            }
        },
        {
            guid: "87dd4661d57b48c3812b4c962c00cc2e",
            name: "CreditCardBlack",
            display: "Pilfer Credit Card Black Edition",
            details: "7,500 limit and 5% cash back",
            rarity: "Legendary",
            crafting: 0,
            cost: 0,
            extra: "Combined from Pilfer Credit Card Silver & Pilfer Credit Card Gold",
            tables: {}
        },
        {
            guid: "189b6fc98b1849ea848523610481af7d",
            name: "ButchersClover",
            display: "Four Leaf Cleaver",
            details: "Sometimes drop golden meat from your enemies",
            rarity: "Legendary",
            crafting: 0,
            cost: 1050,
            extra: "Combined from Butcher's Cleaver & Four Leaf Clover",
            tables: {}
        },
        {
            guid: "f3973f00fda94bfbb4eed373ed28b775",
            name: "RabbitGloves",
            display: "Rabbit Gloves",
            details: "Get a free item in every shop",
            rarity: "Legendary",
            crafting: 0,
            cost: 1200,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 3,
                    weight: 1
                }
            }
        },
        {
            guid: "4202645d8fa34a97a70ded11ee0f8f31",
            name: "KarmicScale",
            display: "Karmic Scale",
            details: "Health, damage, and healing become small and even",
            rarity: "Legendary",
            crafting: 0,
            cost: 1100,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 2,
                    weight: 1
                }
            }
        },
        {
            guid: "bab552535a104b059e636abfd7d05685",
            name: "PocketOfHolding",
            display: "Pocket of Holding",
            details: "Get some temporary bombs each room",
            rarity: "Legendary",
            crafting: 0,
            cost: 550,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 6,
                    weight: 1
                }
            }
        },
        {
            guid: "4cf72d4585f64a95b4d614bd559e4d58",
            name: "LockPick",
            display: "Lockpick",
            details: "Open locks for free, but for how long?",
            rarity: "Legendary",
            crafting: 0,
            cost: 900,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 0,
                    weight: 1
                }
            }
        },
        {
            guid: "5a5b61097a034cfeb6858d2d6c809af0",
            name: "LuckyCharm",
            display: "Lucky Charm",
            details: "A chance at avoiding death",
            rarity: "Common",
            crafting: 38,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 67,
                    weight: 9
                },
                relicAll: {
                    index: 105,
                    weight: 9
                },
                relicShop: {
                    index: 26,
                    weight: 9
                },
                relicFinal: {
                    index: 21,
                    weight: 9
                }
            }
        },
        {
            guid: "52d4e1bd77c84ec790991cf8e87d2ebc",
            name: "LuckyLockpick",
            display: "Lucky Lockpick",
            details: "A chance to not die, and no chance to break",
            rarity: "Legendary",
            crafting: 0,
            cost: 1300,
            extra: "Combined from Lockpick & Lucky Charm",
            tables: {}
        },
        {
            guid: "7b5f646318f3454dacb28fc75eb8c0f2",
            name: "Inverter",
            display: "Inverter",
            details: "Lost curses become blessings",
            rarity: "Rare",
            crafting: 25,
            cost: 475,
            extra: "",
            tables: {
                relic: {
                    index: 69,
                    weight: 2
                },
                relicAll: {
                    index: 101,
                    weight: 2
                }
            }
        },
        {
            guid: "82b826e6d3044504bfa46c4caa6f1b0b",
            name: "Recycler",
            display: "Recycler",
            details: "Destroy empty chests for items",
            rarity: "20",
            crafting: 20,
            cost: 375,
            extra: "",
            tables: {
                relic: {
                    index: 83,
                    weight: 9
                },
                relicAll: {
                    index: 47,
                    weight: 9
                },
                relicShop: {
                    index: 35,
                    weight: 9
                }
            }
        },
        {
            guid: "0682d92aff14474d895c2e91f8826f25",
            name: "FanOfKnives",
            display: "Fan of Knives",
            details: "Release a spray of daggers when you throw",
            rarity: "Common",
            crafting: 16,
            cost: 500,
            extra: "",
            tables: {
                relic: {
                    index: 70,
                    weight: 9
                },
                relicAll: {
                    index: 90,
                    weight: 9
                }
            }
        },
        {
            guid: "f5e0082e84c74286829fa52bf633cbeb",
            name: "KurtzStache",
            display: "Kurtz' Stache",
            details: "tablesA mysterious box that invites calamity",
            rarity: "Common",
            crafting: 0,
            cost: 200,
            extra: "",
            tables: {
                relic: {
                    index: 66,
                    weight: 9
                },
                relicAll: {
                    index: 60,
                    weight: 9
                },
                relicShop: {
                    index: 25,
                    weight: 9
                }
            }
        },
        {
            guid: "b7a8798a25ca4137a95538358085f2f4",
            name: "GlassCannon",
            display: "Glass Cannon",
            details: "Increases damage, but decreases maximum health",
            rarity: "Legendary",
            crafting: 0,
            cost: 775,
            extra: "",
            tables: {
                relicLegendary: {
                    index: 10,
                    weight: 1
                }
            }
        },
        {
            guid: "2e8dd836a09f4e47b57e23b4d00f16ec",
            name: "SoulCannon",
            display: "Soul Cannon",
            details: "Fire a projectile while swinging",
            rarity: "Rare",
            crafting: 0,
            cost: 550,
            extra: "",
            tables: {
                relic: {
                    index: 98,
                    weight: 3
                },
                relicAll: {
                    index: 109,
                    weight: 3
                },
                relicFinal: {
                    index: 29,
                    weight: 3
                }
            }
        },
        {
            guid: "ecc0480e43924477ad68b3e9beb631b3",
            name: "Ara",
            display: "Ara",
            details: "Consumes a future curse after praying",
            rarity: "Common",
            crafting: 26,
            cost: 425,
            extra: "",
            tables: {
                relic: {
                    index: 105,
                    weight: 9
                },
                relicAll: {
                    index: 116,
                    weight: 9
                },
                relicShop: {
                    index: 48,
                    weight: 9
                }
            }
        },
        {
            guid: "6ca902940c004d7c957fe367f77e7337",
            name: "UrsaMajor",
            display: "Ursa Major",
            details: "Increases max health after eating food",
            rarity: "Common",
            crafting: 0,
            cost: 400,
            extra: "",
            tables: {
                relic: {
                    index: 106,
                    weight: 9
                },
                relicAll: {
                    index: 117,
                    weight: 9
                }
            }
        },
        {
            guid: "4ca66dcd2df34cbcbef82e2c5cafd5fc",
            name: "CanisMajor",
            display: "Canis Major",
            details: "Crits temporarily increase crit chance",
            rarity: "Common",
            crafting: 0,
            cost: 300,
            extra: "",
            tables: {
                relic: {
                    index: 107,
                    weight: 9
                },
                relicAll: {
                    index: 118,
                    weight: 9
                },
                relicFinal: {
                    index: 31,
                    weight: 9
                }
            }
        },
        {
            guid: "993daf5814304f9da36d0080fe4b9cbc",
            name: "Sagitta",
            display: "Sagitta",
            details: "Enemies explode in arrows after a critical strike",
            rarity: "Common",
            crafting: 0,
            cost: 325,
            extra: "",
            tables: {
                relic: {
                    index: 108,
                    weight: 9
                },
                relicAll: {
                    index: 119,
                    weight: 9
                }
            }
        },
        {
            guid: "7aedab48d5ca4e5b8d9f33a292ef38ef",
            name: "Circinus",
            display: "Circinus",
            details: "Temporarily reveals secret rooms, secret rooms can have secret rooms",
            rarity: "Common",
            crafting: 0,
            cost: 380,
            extra: "",
            tables: {
                relic: {
                    index: 109,
                    weight: 9
                },
                relicAll: {
                    index: 120,
                    weight: 9
                },
                relicShop: {
                    index: 49,
                    weight: 9
                }
            }
        },
        {
            guid: "1981b4af04434077afafc78691056387",
            name: "CursedAegis",
            display: "Siegfried's Aegis",
            details: "Inflicts pain on the bearer",
            rarity: "Common",
            crafting: 0,
            cost: 1,
            extra: "",
            tables: {}
        },
        {
            guid: "a6587dfd53e54a20ab1a167bc2b40e4a",
            name: "PaladinShield",
            display: "Paladin Shield",
            details: "Siegfried's shield, rid of its agonizing curse. Purified by a nameless wanderer. His legacy redeemed.",
            rarity: "Rare",
            crafting: 1,
            cost: 1000,
            extra: "",
            tables: {
                relic: {
                    index: 96,
                    weight: 2
                },
                relicAll: {
                    index: 51,
                    weight: 2
                },
                relicFinal: {
                    index: 28,
                    weight: 6
                }
            }
        },
        {
            guid: "1981b4af04434077afafc78691056387",
            name: "HotCrossBun",
            display: "Hot Cross Bun",
            details: "Increases maximum health, very slightly",
            rarity: "Common",
            crafting: 0,
            cost: 5,
            extra: "",
            tables: {}
        },
        {
            guid: "898d87f98b184697ac89672f9bf955e4",
            name: "CreditCardSilver",
            display: "Pilfer Credit Card Silver",
            details: "A Gold10.png 2,500 limit at 0% interest",
            rarity: "Common",
            crafting: 0,
            cost: 1,
            extra: "",
            tables: {
                relicShop: {
                    index: 40,
                    weight: 2
                }
            }
        }
    ],
    potion: [
        {
            guid: "f3c6fcf6f86a44178c4649f71fb5d18f",
            name: "TincturePotion",
            display: "Tincture",
            details: "Recovers health",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 1,
                    weight: 9
                },
                potionShop: {
                    index: 1,
                    weight: 10
                },
                potionDibble: {
                    index: 1,
                    weight: 9
                },
                potionFinal: {
                    index: 0,
                    weight: 9
                }
            }
        },
        {
            guid: "27b4611c53e04c0a9d771b76d47d7deb",
            name: "ApprenticesTincturePotion",
            display: "Apprentice's Tincture",
            details: "Recovers a random amount of health",
            rarity: "Common",
            crafting: 12,
            cost: 130,
            extra: "",
            tables: {
                potion: {
                    index: 24,
                    weight: 9
                },
                potionShop: {
                    index: 18,
                    weight: 9
                },
                potionDibble: {
                    index: 18,
                    weight: 9
                },
                potionFinal: {
                    index: 5,
                    weight: 9
                }
            }
        },
        {
            guid: "cea67360abf84347a264ef64ed806e58",
            name: "SalvagingSludgePotion",
            display: "Salvaging Sludge",
            details: "Recover health for each carried curse",
            rarity: "Common",
            crafting: 18,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 54,
                    weight: 9
                },
                potionShop: {
                    index: 38,
                    weight: 9
                }
            }
        },
        {
            guid: "bfe7c47be6fc4bdbb86e364a6b1cf076",
            name: "RegenPotion",
            display: "Troll Sweat",
            details: "Regenerate health over time",
            rarity: "Common",
            crafting: 0,
            cost: 200,
            extra: "",
            tables: {
                potion: {
                    index: 2,
                    weight: 7
                },
                potionShop: {
                    index: 2,
                    weight: 7
                },
                potionDibble: {
                    index: 2,
                    weight: 7
                },
                potionFinal: {
                    index: 1,
                    weight: 7
                }
            }
        },
        {
            guid: "d2c408e370584302b135fc159d6b0b25",
            name: "GhostlyIchorPotion",
            display: "Ghostly Ichor",
            details: "Heal over time for each curse",
            rarity: "Common",
            crafting: 18,
            cost: 200,
            extra: "",
            tables: {
                potion: {
                    index: 41,
                    weight: 9
                },
                potionShop: {
                    index: 28,
                    weight: 9
                },
                potionDibble: {
                    index: 31,
                    weight: 9
                }
            }
        },
        {
            guid: "db3a699d040b4fd6a4a64399f1275d61",
            name: "CureAllPotion",
            display: "Cure All",
            details: "Create a circle of healing",
            rarity: "Rare",
            crafting: 30,
            cost: 100,
            extra: "",
            tables: {
                potion: {
                    index: 40,
                    weight: 2
                },
                potionShop: {
                    index: 27,
                    weight: 2
                },
                potionDibble: {
                    index: 30,
                    weight: 2
                }
            }
        },
        {
            guid: "a3f7691e471243ed899c52b5ae1bc2de",
            name: "CoffeePotion",
            display: "Coffee",
            details: "Recover health proportional to missing health",
            rarity: "Common",
            crafting: 10,
            cost: 160,
            extra: "",
            tables: {
                potion: {
                    index: 45,
                    weight: 9
                },
                potionShop: {
                    index: 30,
                    weight: 9
                },
                potionDibble: {
                    index: 33,
                    weight: 9
                },
                potionFinal: {
                    index: 12,
                    weight: 9
                }
            }
        },
        {
            guid: "f84e9f7aa7b04c648a08c6b75eebaf2e",
            name: "ElixirPotion",
            display: "Elixir",
            details: "Restores all missing health",
            rarity: "Rare",
            crafting: 38,
            cost: 300,
            extra: "",
            tables: {
                potion: {
                    index: 22,
                    weight: 3
                },
                potionShop: {
                    index: 16,
                    weight: 3
                },
                potionDibble: {
                    index: 17,
                    weight: 3
                },
                potionFinal: {
                    index: 4,
                    weight: 3
                }
            }
        },
        {
            guid: "27497c3cdd91494ba066eb45ee59d528",
            name: "PartyPopcornPotion",
            display: "Rainbow Kernels",
            details: "Duplicate almost everything in the room",
            rarity: "Rare",
            crafting: 44,
            cost: 500,
            extra: "",
            tables: {
                potion: {
                    index: 18,
                    weight: 1
                }
            }
        },
        {
            guid: "0455a3d8711146e3a479e71d4d37954b",
            name: "GoldPopcornPotion",
            display: "Golden Kernels",
            details: "Duplicate all gold in the room",
            rarity: "Common",
            crafting: 16,
            cost: 100,
            extra: "",
            tables: {
                potion: {
                    index: 16,
                    weight: 2
                },
                potionShop: {
                    index: 12,
                    weight: 2
                },
                potionDibble: {
                    index: 14,
                    weight: 3
                }
            }
        },
        {
            guid: "dc421ae2fb974a01b8cc4b2a9093244e",
            name: "ItemPopcornPotion",
            display: "Popcorn Kernels",
            details: "Duplicate all basic items in the room",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 17,
                    weight: 7
                },
                potionShop: {
                    index: 13,
                    weight: 5
                }
            }
        },
        {
            guid: "908bacbc988a46559da7ef9f4fe8e042",
            name: "FoodPopcornPotion",
            display: "Seasoned Kernels",
            details: "Duplicate all food in the room",
            rarity: "Common",
            crafting: 15,
            cost: 110,
            extra: "",
            tables: {
                potion: {
                    index: 15,
                    weight: 7
                },
                potionShop: {
                    index: 11,
                    weight: 5
                },
                potionDibble: {
                    index: 13,
                    weight: 9
                }
            }
        },
        {
            guid: "5638e38a67e04f4eaec6473d5042890f",
            name: "WhiplashPotion",
            display: "Whiplash Serum",
            details: "Temporarily increases throw damage",
            rarity: "Common",
            crafting: 0,
            cost: 175,
            extra: "",
            tables: {
                potion: {
                    index: 26,
                    weight: 9
                },
                potionShop: {
                    index: 50,
                    weight: 6
                },
                potionDibble: {
                    index: 20,
                    weight: 9
                },
                potionFinal: {
                    index: 6,
                    weight: 9
                }
            }
        },
        {
            guid: "fb789e8f36a349f1a71ceb2e9c1e3f46",
            name: "StrengthPotion",
            display: "Strength Serum",
            details: "Temporarily increases swing damage",
            rarity: "Common",
            crafting: 0,
            cost: 175,
            extra: "",
            tables: {
                potion: {
                    index: 27,
                    weight: 9
                },
                potionShop: {
                    index: 47,
                    weight: 6
                },
                potionDibble: {
                    index: 21,
                    weight: 9
                },
                potionFinal: {
                    index: 7,
                    weight: 9
                }
            }
        },
        {
            guid: "5178abb3de614cb59411b8144fd2dc32",
            name: "SavagryPotion",
            display: "Savagery Serum",
            details: "Temporarily increases critical chance",
            rarity: "Common",
            crafting: 0,
            cost: 175,
            extra: "",
            tables: {
                potion: {
                    index: 28,
                    weight: 9
                },
                potionShop: {
                    index: 46,
                    weight: 6
                },
                potionDibble: {
                    index: 22,
                    weight: 9
                },
                potionFinal: {
                    index: 8,
                    weight: 9
                }
            }
        },
        {
            guid: "00772a2e1a7d4755a76e8183b1d6b0ce",
            name: "AlacrityPotion",
            display: "Alacrity Serum",
            details: "Temporarily increases attack speed",
            rarity: "Common",
            crafting: 0,
            cost: 175,
            extra: "",
            tables: {
                potion: {
                    index: 29,
                    weight: 9
                },
                potionShop: {
                    index: 42,
                    weight: 6
                },
                potionDibble: {
                    index: 23,
                    weight: 9
                },
                potionFinal: {
                    index: 9,
                    weight: 9
                }
            }
        },
        {
            guid: "44cd9c54d22c4ab289b5edf7b4fe40f4",
            name: "CleaveSerumPotion",
            display: "Sundering Serum",
            details: "Temporarily increases swing size",
            rarity: "Common",
            crafting: 0,
            cost: 200,
            extra: "",
            tables: {
                potion: {
                    index: 50,
                    weight: 9
                },
                potionShop: {
                    index: 34,
                    weight: 6
                },
                potionDibble: {
                    index: 34,
                    weight: 9
                },
                potionFinal: {
                    index: 13,
                    weight: 9
                }
            }
        },
        {
            guid: "fe0fbfc6bceb4a2f91ea280ba82f7d38",
            name: "GustSerumPotion",
            display: "Cyclonic Serum",
            details: "Temporarily increases throw size",
            rarity: "Common",
            crafting: 0,
            cost: 200,
            extra: "",
            tables: {
                potion: {
                    index: 51,
                    weight: 9
                },
                potionShop: {
                    index: 35,
                    weight: 6
                },
                potionDibble: {
                    index: 35,
                    weight: 9
                },
                potionFinal: {
                    index: 14,
                    weight: 9
                }
            }
        },
        {
            guid: "617b7758377d4230a24823645d3898f4",
            name: "HealthSerumPotion",
            display: "Durability Serum",
            details: "",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 52,
                    weight: 9
                },
                potionShop: {
                    index: 36,
                    weight: 6
                },
                potionDibble: {
                    index: 36,
                    weight: 9
                },
                potionFinal: {
                    index: 15,
                    weight: 9
                }
            }
        },
        {
            guid: "df251e38396f44119823faa3840db809",
            name: "DecursePotion",
            display: "Holy Water",
            details: "Remove a curse",
            rarity: "Common",
            crafting: 0,
            cost: 325,
            extra: "",
            tables: {
                potion: {
                    index: 14,
                    weight: 9
                },
                potionShop: {
                    index: 10,
                    weight: 9
                },
                potionDibble: {
                    index: 12,
                    weight: 9
                }
            }
        },
        {
            guid: "e99410fecfac4015b5504ec3b87b5cd0",
            name: "PurgePotion",
            display: "Purge Potion",
            details: "Removes a curse and deals 75 damage.",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 35,
                    weight: 9
                },
                potionShop: {
                    index: 21,
                    weight: 9
                },
                potionDibble: {
                    index: 27,
                    weight: 9
                }
            }
        },
        {
            guid: "2d9d51a29ebe40a99d37445de1954951",
            name: "PurificationPotion",
            display: "Purification Potion",
            details: "Removes all curses, bombs, keys, and sets health to 1",
            rarity: "Rare",
            crafting: 0,
            cost: 1000,
            extra: "",
            tables: {
                potion: {
                    index: 39,
                    weight: 1
                },
                potionShop: {
                    index: 26,
                    weight: 1
                }
            }
        },
        {
            guid: "7ca4f0f6567c4b348fd6ccae072dbded",
            name: "Aether",
            display: "Aether",
            details: "Remove a specific curse",
            rarity: "Common",
            crafting: 80,
            cost: 600,
            extra: "",
            tables: {
                potion: {
                    index: 49,
                    weight: 2
                },
                potionShop: {
                    index: 33,
                    weight: 2
                }
            }
        },
        {
            guid: "28737e052b414273a67aca33267fc2e7",
            name: "Absolution",
            display: "Absolution",
            details: "If you have exactly 5 curses, removes 5 curses",
            rarity: "Common",
            crafting: 0,
            cost: 800,
            extra: "",
            tables: {
                potion: {
                    index: 38,
                    weight: 2
                },
                potionShop: {
                    index: 25,
                    weight: 2
                },
                potionDibble: {
                    index: 29,
                    weight: 2
                }
            }
        },
        {
            guid: "b0dd99d6f5184fb49df441af4bf298a5",
            name: "BombDoublingPotion",
            display: "Doubling Saison",
            details: "Double your bombs",
            rarity: "Common",
            crafting: 0,
            cost: 220,
            extra: "",
            tables: {
                potion: {
                    index: 13,
                    weight: 3
                },
                potionShop: {
                    index: 9,
                    weight: 3
                },
                potionDibble: {
                    index: 11,
                    weight: 3
                }
            }
        },
        {
            guid: "f34771cdd3514f379f42355fb1b4a41d",
            name: "SwapPotion",
            display: "Impish Key Bomb",
            details: "Swap your items around",
            rarity: "Common",
            crafting: 0,
            cost: 240,
            extra: "",
            tables: {
                potion: {
                    index: 9,
                    weight: 9
                },
                potionShop: {
                    index: 6,
                    weight: 9
                },
                potionDibble: {
                    index: 7,
                    weight: 9
                }
            }
        },
        {
            guid: "20d260544d224607b1f2363d06def2a0",
            name: "IronGlazePotion",
            display: "Iron Glaze",
            details: "Average the number of held keys and bombs",
            rarity: "Rare",
            crafting: 10,
            cost: 175,
            extra: "",
            tables: {
                potion: {
                    index: 47,
                    weight: 9
                },
                potionShop: {
                    index: 32,
                    weight: 9
                }
            }
        },
        {
            guid: "2caf27e525fa4787bd629282ef202094",
            name: "HolyGlaze",
            display: "Holy Glaze",
            details: "Average the levels of all blessings",
            rarity: "Common",
            crafting: 20,
            cost: 275,
            extra: "",
            tables: {
                potion: {
                    index: 58,
                    weight: 9
                },
                potionShop: {
                    index: 41,
                    weight: 9
                },
                potionDibble: {
                    index: 37,
                    weight: 9
                }
            }
        },
        {
            guid: "15ca0afa442849328a5a8ff6411b301a",
            name: "AmbrosiaPotion",
            display: "Ambrosia",
            details: "Double the level of a random blessing",
            rarity: "Rare",
            crafting: 38,
            cost: 375,
            extra: "",
            tables: {
                potion: {
                    index: 57,
                    weight: 3
                },
                potionShop: {
                    index: 40,
                    weight: 3
                }
            }
        },
        {
            guid: "87304ff317824d638d8c2a591b5ce37b",
            name: "NitroglycerinPotion",
            display: "Nitroglycerin",
            details: "Drop bombs continuously",
            rarity: "Common",
            crafting: 0,
            cost: 220,
            extra: "",
            tables: {
                potion: {
                    index: 12,
                    weight: 9
                },
                potionShop: {
                    index: 8,
                    weight: 9
                },
                potionDibble: {
                    index: 10,
                    weight: 9
                }
            }
        },
        {
            guid: "1c0df4b6c9f2494c8eb2376ec97ca4fb",
            name: "AuglycerinPotion",
            display: "Auglycerin",
            details: "Drop gold continuously",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 19,
                    weight: 9
                },
                potionShop: {
                    index: 43,
                    weight: 9
                },
                potionDibble: {
                    index: 15,
                    weight: 9
                }
            }
        },
        {
            guid: "4673c7f91a7b4d35b8ebe30a16ce650a",
            name: "ImmolatePotion",
            display: "Immolation Potion",
            details: "Burns nearby enemies",
            rarity: "Common",
            crafting: 10,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 11,
                    weight: 9
                },
                potionShop: {
                    index: 52,
                    weight: 9
                },
                potionDibble: {
                    index: 9,
                    weight: 9
                }
            }
        },
        {
            guid: "d42df1015fa04546bfd1cc0958cfc34b",
            name: "FloatPotion",
            display: "Float Potion",
            details: "Avoid falling into holes",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 10,
                    weight: 9
                },
                potionShop: {
                    index: 7,
                    weight: 9
                },
                potionDibble: {
                    index: 8,
                    weight: 9
                }
            }
        },
        {
            guid: "b994f67a8e3f44578e1899cd043e3997",
            name: "SeltsBlood",
            display: "Selt's Blood",
            details: "Spawn larvae",
            rarity: "Rare",
            crafting: 10,
            cost: 220,
            extra: "",
            tables: {
                potion: {
                    index: 33,
                    weight: 3
                },
                potionShop: {
                    index: 53,
                    weight: 3
                },
                potionDibble: {
                    index: 26,
                    weight: 3
                }
            }
        },
        {
            guid: "0b736c7fe4974e65a08cd5c0ab189929",
            name: "BloodChalice",
            display: "Blood Chalice",
            details: "Consumes 25% health, drops items and sometimes another blood chalice.",
            rarity: "Rare",
            crafting: 50,
            cost: 290,
            extra: "",
            tables: {
                potion: {
                    index: 37,
                    weight: 3
                },
                potionShop: {
                    index: 24,
                    weight: 3
                }
            }
        },
        {
            guid: "12784fa0c4a949fdadf21288bc5ec170",
            name: "FireballPotion",
            display: "Fury Potion",
            details: "Fire some fireballs",
            rarity: "Common",
            crafting: 0,
            cost: 100,
            extra: "",
            tables: {
                potion: {
                    index: 8,
                    weight: 9
                },
                potionShop: {
                    index: 44,
                    weight: 9
                },
                potionDibble: {
                    index: 6,
                    weight: 9
                }
            }
        },
        {
            guid: "5f8cb66127e74d0baff7a1ba5b4cf972",
            name: "ReverseDamagePotion",
            display: "Antimatter",
            details: "The next time you would take damage, gain that much health instead",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 7,
                    weight: 9
                },
                potionShop: {
                    index: 5,
                    weight: 9
                },
                potionDibble: {
                    index: 5,
                    weight: 9
                },
                potionFinal: {
                    index: 3,
                    weight: 9
                }
            }
        },
        {
            guid: "05572761ed6d4d4f91203cd46f890adf",
            name: "PickledPilferPotion",
            display: "Bottled Pilfer",
            details: "Releases a Hoarding Pilfer",
            rarity: "Rare",
            crafting: 22,
            cost: 500,
            extra: "",
            tables: {
                potion: {
                    index: 6,
                    weight: 3
                },
                potionShop: {
                    index: 4,
                    weight: 3
                }
            }
        },
        {
            guid: "bcfda0149d944afcb246305be2695172",
            name: "ShopPotion",
            display: "Shop in a Bottle",
            details: "Discover the secret shop",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 4,
                    weight: 3
                },
                potionShop: {
                    index: 22,
                    weight: 3
                }
            }
        },
        {
            guid: "f83096ef1b674f6c832dec65a4a3d758",
            name: "PotionPotion",
            display: "Bottles in a Bottle",
            details: "Drop two potions",
            rarity: "Rare",
            crafting: 0,
            cost: 300,
            extra: "",
            tables: {
                potion: {
                    index: 48,
                    weight: 3
                },
                potionShop: {
                    index: 45,
                    weight: 3
                }
            }
        },
        {
            guid: "15c7f082e7454fc38695e6152782bbf9",
            name: "ChestInABottle",
            display: "Chest in a Bottle",
            details: "Drop a random chest",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 20,
                    weight: 9
                },
                potionShop: {
                    index: 14,
                    weight: 9
                }
            }
        },
        {
            guid: "cda68d3762ef4aa6bc5b00e2f8eeec6d",
            name: "TransmuterInABottle",
            display: "TRANSMUT3 in a Bottle",
            details: "Add a TRANSMUT3 to the room",
            rarity: "Common",
            crafting: 26,
            cost: 300,
            extra: "",
            tables: {
                potion: {
                    index: 34,
                    weight: 9
                }
            }
        },
        {
            guid: "f05bebbd21e04c468299c7763704f332",
            name: "AltarInABottle",
            display: "Altar in a Bottle",
            details: "Spawn an altar",
            rarity: "Common",
            crafting: 35,
            cost: 200,
            extra: "",
            tables: {
                potion: {
                    index: 46,
                    weight: 9
                },
                potionShop: {
                    index: 31,
                    weight: 9
                }
            }
        },
        {
            guid: "6da20a3b58c3488c8b764ae90689cb04",
            name: "DopplePotion",
            display: "Doppelbock",
            details: "Summon a doppelganger to work alongside you",
            rarity: "Common",
            crafting: 0,
            cost: 300,
            extra: "",
            tables: {
                potion: {
                    index: 66,
                    weight: 9
                },
                potionShop: {
                    index: 58,
                    weight: 9
                },
                potionDibble: {
                    index: 41,
                    weight: 1
                },
                potionFinal: {
                    index: 19,
                    weight: 9
                }
            }
        },
        {
            guid: "b12beb42d1b549e392b00d00a01520c9",
            name: "Transmutagen",
            display: "Transmutagen",
            details: "Transforms all relics in the room",
            rarity: "Rare",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 5,
                    weight: 3
                },
                potionShop: {
                    index: 3,
                    weight: 9
                },
                potionDibble: {
                    index: 4,
                    weight: 3
                }
            }
        },
        {
            guid: "a72e7b460e8649b08298d8c4bf15f349",
            name: "SwapRelicPotion",
            display: "Metamorphim",
            details: "Transmute a carried relic",
            rarity: "Rare",
            crafting: 0,
            cost: 500,
            extra: "",
            tables: {
                potion: {
                    index: 23,
                    weight: 2
                }
            }
        },
        {
            guid: "06eea0e248e74a249d1fe9b3c92d0b70",
            name: "SwapAllRelicPotion",
            display: "Mighty Metamorphim",
            details: "Transmute all carried relics",
            rarity: "Rare",
            crafting: 50,
            cost: 1000,
            extra: "",
            tables: {
                potion: {
                    index: 30,
                    weight: 3
                },
                potionShop: {
                    index: 17,
                    weight: 3
                },
                potionDibble: {
                    index: 24,
                    weight: 3
                }
            }
        },
        {
            guid: "8a91e7875f294cb280f34898b5594f2d",
            name: "CircleTransmutePotion",
            display: "Circle of Transmutation",
            details: "Transmutes items in a small circle, but makes them fragile",
            rarity: "Rare",
            crafting: 85,
            cost: 360,
            extra: "",
            tables: {
                potion: {
                    index: 55,
                    weight: 3
                },
                potionShop: {
                    index: 51,
                    weight: 3
                }
            }
        },
        {
            guid: "200012b4fdb74289b228f292193cf146",
            name: "UnholyStrengthPotion",
            display: "Berserker's Brew",
            details: "Deal and take more damage",
            rarity: "Common",
            crafting: 0,
            cost: 175,
            extra: "",
            tables: {
                potion: {
                    index: 3,
                    weight: 9
                },
                potionShop: {
                    index: 49,
                    weight: 9
                },
                potionDibble: {
                    index: 3,
                    weight: 9
                },
                potionFinal: {
                    index: 2,
                    weight: 9
                }
            }
        },
        {
            guid: "b9c7849437254fcbbe60ab61143f1de5",
            name: "GhostPepperSauce",
            display: "Ghost Pepper Sauce",
            details: "Become immune to fire damage and ignite yourself",
            rarity: "Common",
            crafting: 15,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 43,
                    weight: 9
                },
                potionShop: {
                    index: 29,
                    weight: 9
                },
                potionDibble: {
                    index: 32,
                    weight: 9
                }
            }
        },
        {
            guid: "2849e0d8002e4800936de05abbde0ed7",
            name: "ToadvinesTonic",
            display: "Toadvine's Tonic",
            details: "Become immune to poison, if you can survive it",
            rarity: "Common",
            crafting: 15,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 65,
                    weight: 9
                },
                potionShop: {
                    index: 57,
                    weight: 9
                },
                potionDibble: {
                    index: 40,
                    weight: 1
                }
            }
        },
        {
            guid: "9c0401cc3c9a4188a6b3c800215b557d",
            name: "NumbingCream",
            display: "Numbing Cream",
            details: "Reduce incoming damage",
            rarity: "Rare",
            crafting: 26,
            cost: 375,
            extra: "",
            tables: {
                potion: {
                    index: 53,
                    weight: 3
                },
                potionShop: {
                    index: 37,
                    weight: 3
                },
                potionFinal: {
                    index: 16,
                    weight: 3
                }
            }
        },
        {
            guid: "e50bae2f580c4159a881f6c7852ca586",
            name: "EagleEyePotion",
            display: "Potion of True Sight",
            details: "Discover nearby secrets",
            rarity: "Common",
            crafting: 8,
            cost: 140,
            extra: "",
            tables: {
                potion: {
                    index: 0,
                    weight: 9
                },
                potionShop: {
                    index: 0,
                    weight: 9
                },
                potionDibble: {
                    index: 0,
                    weight: 9
                }
            }
        },
        {
            guid: "8372b8d3152445afa410b7bb9dbd45a8",
            name: "PotionofPlenty",
            display: "Potion of Plenty",
            details: "Drop some useful things",
            rarity: "Common",
            crafting: 0,
            cost: 210,
            extra: "",
            tables: {
                potion: {
                    index: 21,
                    weight: 9
                },
                potionShop: {
                    index: 15,
                    weight: 9
                },
                potionDibble: {
                    index: 16,
                    weight: 9
                }
            }
        },
        {
            guid: "84e344cdca10420a9db29efbd3d1dc72",
            name: "ProteinPotion",
            display: "Protein Shake",
            details: "Drop some protein",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                potion: {
                    index: 32,
                    weight: 9
                },
                potionShop: {
                    index: 20,
                    weight: 9
                },
                potionDibble: {
                    index: 25,
                    weight: 9
                },
                potionFinal: {
                    index: 10,
                    weight: 9
                }
            }
        },
        {
            guid: "a716c2ee1f634d74af7cc84ff341d374",
            name: "BlessedBlend",
            display: "Blessed Blend",
            details: "Drops a blessing",
            rarity: "Common",
            crafting: 16,
            cost: 275,
            extra: "",
            tables: {
                potion: {
                    index: 42,
                    weight: 7
                },
                potionFinal: {
                    index: 11,
                    weight: 7
                }
            }
        },
        {
            guid: "4bbe9f7680b34a17a1ca6dfc90c725e7",
            name: "ToxinPotion",
            display: "Toxin",
            details: "Coat your weapon with poison",
            rarity: "Common",
            crafting: 0,
            cost: 175,
            extra: "",
            tables: {
                potion: {
                    index: 25,
                    weight: 9
                },
                potionShop: {
                    index: 48,
                    weight: 9
                },
                potionDibble: {
                    index: 19,
                    weight: 9
                }
            }
        },
        {
            guid: "c0a32814b2e24d15a63664bcdc949d26",
            name: "WitchsBrew",
            display: "Witch's Brew",
            details: "Become cursed",
            rarity: "Rare",
            crafting: 0,
            cost: 500,
            extra: "",
            tables: {
                potion: {
                    index: 64,
                    weight: 0
                }
            }
        },
        {
            guid: "145bde979116479fabc648bebf584e32",
            name: "FreeloaderPotion",
            display: "Freeloader Draught",
            details: "Get something for nothing",
            rarity: "Rare",
            crafting: 0,
            cost: 400,
            extra: "",
            tables: {
                potion: {
                    index: 31,
                    weight: 2
                },
                potionShop: {
                    index: 19,
                    weight: 2
                }
            }
        },
        {
            guid: "6a41bdb034dd45549825a7b4f9198362",
            name: "BiscuitsPotion",
            display: "Biscuits",
            details: "Increse experience gain for a familiar.",
            rarity: "Common",
            crafting: 0,
            cost: 300,
            extra: "",
            tables: {
                potion: {
                    index: 36,
                    weight: 9
                },
                potionShop: {
                    index: 23,
                    weight: 9
                },
                potionDibble: {
                    index: 28,
                    weight: 9
                }
            }
        },
        {
            guid: "17392f3e7d05485a800ddcd201bfb98c",
            name: "MidasTouchPotion",
            display: "Midas Touch",
            details: "All enemies are turned to gold",
            rarity: "Rare",
            crafting: 20,
            cost: 375,
            extra: "",
            tables: {
                potion: {
                    index: 44,
                    weight: 3
                }
            }
        },
        {
            guid: "4f9154518bfe4a0ebd09e57aef8ebdf9",
            name: "KissSuccubusPotion",
            display: "Kiss of the Succubus",
            details: "Kill all enemies and steal their health",
            rarity: "Rare",
            crafting: 20,
            cost: 450,
            extra: "",
            tables: {
                potion: {
                    index: 56,
                    weight: 3
                },
                potionShop: {
                    index: 39,
                    weight: 3
                }
            }
        },
        {
            guid: "5829b0cc3f6149da9649aa302cf7ca57",
            name: "AllPotion",
            display: "All-Potion",
            details: "Is whatever you need it to be",
            rarity: "Rare",
            crafting: 99,
            cost: 500,
            extra: "",
            tables: {
                potion: {
                    index: 59,
                    weight: 2
                }
            }
        },
        {
            guid: "ee6c6499fedf45d891ce5c3ee09b2da3",
            name: "SomePotion",
            display: "Some-Potion",
            details: "Is whatever you need it to be, sometimes",
            rarity: "Rare",
            crafting: 98,
            cost: 400,
            extra: "",
            tables: {
                potion: {
                    index: 60,
                    weight: 3
                }
            }
        },
        {
            guid: "1cfe53e981a24b7cbbad91669f5ac52e",
            name: "StarlightSip",
            display: "Starlight Sip",
            details: "Pull the heavens down onto your foes",
            rarity: "Common",
            crafting: 28,
            cost: 500,
            extra: "",
            tables: {
                potion: {
                    index: 61,
                    weight: 6
                },
                potionShop: {
                    index: 54,
                    weight: 3
                },
                potionDibble: {
                    index: 38,
                    weight: 3
                },
                potionFinal: {
                    index: 17,
                    weight: 6
                }
            }
        },
        {
            guid: "43f16c0b6aa94743a87c235025a7f98d",
            name: "ChurchbellNectarPotion",
            display: "Churchbell Nectar",
            details: "Creates a temporary Churchbell shield",
            rarity: "Common",
            crafting: 16,
            cost: 300,
            extra: "",
            tables: {
                potion: {
                    index: 62,
                    weight: 9
                },
                potionShop: {
                    index: 55,
                    weight: 6
                },
                potionDibble: {
                    index: 39,
                    weight: 6
                },
                potionFinal: {
                    index: 18,
                    weight: 9
                }
            }
        },
        {
            guid: "4c8d7e3454124c4aab32c45bf05edc8b",
            name: "PangolinPotion",
            display: "Pangolin Potion",
            details: "Refills four armor points",
            rarity: "Common",
            crafting: 0,
            cost: 450,
            extra: "",
            tables: {
                potion: {
                    index: 63,
                    weight: 6
                },
                potionShop: {
                    index: 56,
                    weight: 6
                }
            }
        }
    ],
    item: [
        {
            guid: "8d0acbcdb33a46a9bfa9c623e8be72e6",
            name: "Bomb",
            display: "Bomb",
            details: "Deals damage and destroys rocks, as well as other objects",
            rarity: "Common",
            crafting: 0,
            cost: 50,
            extra: "",
            tables: {
                item: {
                    index: 0,
                    weight: 20
                },
                itemShop: {
                    index: 0,
                    weight: 20
                },
                itemDibble: {
                    index: 0,
                    weight: 9
                }
            }
        },
        {
            guid: "0f53c763ed3b4c77bceaa4853f95ead0",
            name: "BombBag",
            display: "Bag O' Bombs",
            details: "Full of bombs",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                item: {
                    index: 3,
                    weight: 2
                },
                itemShop: {
                    index: 3,
                    weight: 2
                },
                itemDibble: {
                    index: 2,
                    weight: 1
                }
            }
        },
        {
            guid: "c82f660a0fbd4eb983e98d5896253e09",
            name: "Key",
            display: "Key",
            details: "Unlocks chests, doors and other locked objects",
            rarity: "Common",
            crafting: 0,
            cost: 120,
            extra: "",
            tables: {
                item: {
                    index: 1,
                    weight: 15
                },
                itemShop: {
                    index: 1,
                    weight: 15
                },
                itemDibble: {
                    index: 1,
                    weight: 9
                }
            }
        },
        {
            guid: "32d2db84cca547699565e949c6815f06",
            name: "KeyRing",
            display: "Key Ring",
            details: "Full of keys",
            rarity: "Common",
            crafting: 0,
            cost: 240,
            extra: "",
            tables: {
                item: {
                    index: 4,
                    weight: 1
                },
                itemShop: {
                    index: 4,
                    weight: 1
                },
                itemDibble: {
                    index: 3,
                    weight: 1
                }
            }
        },
        {
            guid: "dd61c0367bbf41f9bb86a85c1e7b0aae",
            name: "Talisman",
            display: "Talisman",
            details: "Removes a curse",
            rarity: "Common",
            crafting: 0,
            cost: 300,
            extra: "",
            tables: {
                item: {
                    index: 2,
                    weight: 4
                },
                itemShop: {
                    index: 2,
                    weight: 4
                }
            }
        }
    ],
    food: [
        {
            guid: "3771da94280f49959634ebc9bc7098a4",
            name: "HealthS",
            display: "Medium Rare Steak",
            details: "Restores a small amount of health",
            rarity: "Common",
            crafting: 0,
            cost: 50,
            extra: "",
            tables: {
                food: {
                    index: 0,
                    weight: 15
                }
            }
        },
        {
            guid: "5d1d5865fd7b4353b3b43fe0d81b7960",
            name: "HealthM",
            display: "Fish Kebab",
            details: "Restores a moderate amount of health",
            rarity: "Common",
            crafting: 0,
            cost: 200,
            extra: "",
            tables: {
                food: {
                    index: 1,
                    weight: 4
                }
            }
        },
        {
            guid: "e218308da36941de8705ba950e0455f3",
            name: "HealthL",
            display: "Ham Shank",
            details: "Restores a large amount of health",
            rarity: "Common",
            crafting: 0,
            cost: 300,
            extra: "",
            tables: {
                food: {
                    index: 2,
                    weight: 1
                }
            }
        },
        {
            guid: "c0ee06997e624cd88c68171930159fa1",
            name: "ArmorShard",
            display: "Armor Shard",
            details: "Refills a point of armor",
            rarity: "Common",
            crafting: 0,
            cost: 150,
            extra: "",
            tables: {
                food: {
                    index: 3,
                    weight: 5
                }
            }
        }
    ],
    weightedTables: [
        {
            key: "itemDibble",
            type: "item",
            randState: "dibble",
            tables: {
                dibble: {
                    index: 0,
                    weight: 5,
                },
                dibbleRelic: {
                    index: 0,
                    weight: 5
                }
            }
        },
        {
            key: "potionDibble",
            type: "potion",
            randState: "dibble",
            tables: {
                dibble: {
                    index: 1,
                    weight: 2
                },
                dibbleRelic: {
                    index: 1,
                    weight: 2
                }
            }
        },
        {
            key: "relic",
            type: "relic",
            randState: "relic",
            tables: {
                dibbleRelic: {
                    index: 2,
                    weight: 1
                }
            }
        },
        {
            key: "potionShop",
            type: "potion",
            randState: "shopPotion",
            tables: {
                potionOrRelic: {
                    index: 0,
                    weight: 3
                }
            }
        },
        {
            key: "relicShop",
            type: "relic",
            randState: "shopRelic",
            tables: {
                potionOrRelic: {
                    index: 1,
                    weight: 1
                }
            }
        }
    ]
};
const mineEncounterGroups = {
    "mineSmall": {
        "begin": [
            { weight: 4, roomName: "Mine_Small_Begin_Plain", sequence: { roomTypes: ["mineSmall"], tag: "hoodie_entrance", branch: 1, direction: 1 }
            }
        ],
        "normal_encounters": [
            { weight: 3, roomName: "Mine_Small_Normal_MineCart" },
            { weight: 3, roomName: "Mine_Small_Normal_Pillar" },
            { weight: 3, roomName: "Mine_Small_Normal_PillarHole" },
            { weight: 3, roomName: "Mine_Small_Normal_PillarSpinner" },
            { weight: 3, roomName: "Mine_Small_Normal_RockWall" },
            { weight: 3, roomName: "Mine_Small_Normal_SouthNorthHole" },
            { weight: 3, roomName: "Mine_Small_Normal_StationarySpinners" },
            { weight: 3, roomName: "Mine_Small_Normal_BrokenCarts" },
            { weight: 3, roomName: "Mine_Small_Normal_StatueSpinner" },
            { weight: 2, roomName: "Mine_Small_Normal_Bridge" },
            { weight: 3, roomName: "Mine_Small_Normal_EWSpinners" },
            { weight: 3, roomName: "Mine_Small_Normal_CornerHoles" },
            { weight: 3, roomName: "Mine_Small_Normal_DualPillar" },
            { weight: 3, roomName: "Mine_Small_Normal_Spikes" },
            { weight: 3, roomName: "Mine_Small_Normal_SpikePatch" },
            { weight: 3, roomName: "Mine_Small_Normal_PillarSpawner" },
            { weight: 1, roomName: "Mine_Small_Normal_SetPiece" },
            { weight: 2, roomName: "Mine_Small_Normal_HoleEW" },
            { weight: 2, roomName: "Mine_Small_Normal_HoleEWSpinner" },
            { weight: 4, roomName: "Mine_Small_Normal_Plain" },
            { weight: 2, roomName: "Mine_Small_Normal_HazardHeavy" },
            { weight: 2, roomName: "Mine_Small_Normal_DangerWalls" },
            { weight: 3, roomName: "Mine_Small_Normal_TilePattern" },
            { weight: 3, roomName: "Mine_Small_Normal_CornerRocks" },
            { weight: 2, roomName: "Mine_Small_Normal_RockPath" },
            { weight: 3, roomName: "Mine_Small_Normal_DiagonalHole" },
            { weight: 3, roomName: "Mine_Small_Normal_CenterTorches" },
            { weight: 2, roomName: "Mine_Small_Normal_Ruins" },
            { weight: 3, roomName: "Mine_Small_Normal_Statues" },
            { weight: 3, roomName: "Mine_Small_Normal_LargeSpinnerTrack" }
        ],
        "relic_encounters_unlocked": [
            { weight: 4, roomName: "Mine_Small_Relic_Locked_Pots", requirement: "noRelicHex" },
            { weight: 4, roomName: "Mine_Small_Relic_Locked_Torches", requirement: "noRelicHex" },
            { weight: 4, roomName: "Mine_Small_Relic_Locked_Hole", requirement: "noRelicHex" },
            { weight: 1, roomName: "Mine_Small_Relic_Locked_TorchPuzzle", requirement: "noRelicHex" },
            { weight: 4, roomName: "Mine_Small_Relic_Locked_Statues", requirement: "noRelicHex" }
        ],
        "relic_encounters": [
            { weight: 4, roomName: "Mine_Small_Relic_Locked_Pots", doorType: "locked", requirement: "noRelicHex" },
            { weight: 4, roomName: "Mine_Small_Relic_Locked_Torches", doorType: "locked", requirement: "noRelicHex" },
            { weight: 4, roomName: "Mine_Small_Relic_Locked_Hole", doorType: "locked", requirement: "noRelicHex" },
            { weight: 1, roomName: "Mine_Small_Relic_Locked_TorchPuzzle", doorType: "locked", requirement: "noRelicHex" },
            { weight: 4, roomName: "Mine_Small_Relic_Locked_Statues", doorType: "locked", requirement: "noRelicHex" }
        ],
        "secret": [
            { weight: 4, roomName: "Mine_Small_Secret_WaterChest", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 4, roomName: "Mine_Small_Secret_Carts", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 1, roomName: "Mine_Small_Secret_Altar", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Small_Secret_CursedTorch", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Small_Secret_Crystals", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 4, roomName: "Mine_Small_Secret_Chest", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Small_Secret_SpikeSacrifice", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 1, roomName: "Mine_Small_Secret_Blessing", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Small_Secret_Items", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Small_Secret_Chest", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Small_Secret_ChestCommon", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Small_Secret_KeyBlock", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Small_Secret_Bombs", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 10, roomName: "Mine_Small_Secret_DogShadow", doorType: "secret", requirement: "dogShadowNotFound", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 2, roomName: "Mine_Small_Secret_LeverBlocks", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 1, roomName: "Mine_Small_Secret_Tent", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 2, roomName: "Mine_Small_Secret_Nugg", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Small_Secret_Bard", doorType: "secret", requirement: "thisRunBardNotMet", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Small_Secret_TributeFountain", doorType: "secret", requirement: "bogUnlocked", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            }
        ],
        "hidden": [
            { weight: 3, roomName: "Mine_Small_Hidden_WaterChest", doorType: "hidden" },
            { weight: 3, roomName: "Mine_Small_Hidden_Carts", doorType: "hidden" },
            { weight: 1, roomName: "Mine_Small_Hidden_TreasureHunt", doorType: "hidden", requirement: "noTreasureNote" },
            { weight: 1, roomName: "Mine_Small_Hidden_Altar", doorType: "hidden" },
            { weight: 2, roomName: "Mine_Small_Hidden_CursedTorch", doorType: "hidden" },
            { weight: 2, roomName: "Mine_Small_Hidden_CursedRelic", doorType: "hidden" },
            { weight: 3, roomName: "Mine_Small_Hidden_Crystals", doorType: "hidden" },
            { weight: 1, roomName: "Mine_Small_Hidden_Lab", doorType: "hidden" },
            { weight: 3, roomName: "Mine_Small_Hidden_Chest", doorType: "hidden" },
            { weight: 3, roomName: "Mine_Small_Hidden_SpikeSacrifice", doorType: "hidden" },
            { weight: 1, roomName: "Mine_Small_Hidden_Blessing", doorType: "hidden" },
            { weight: 1, roomName: "Mine_Small_Hidden_Blessing02", doorType: "hidden" },
            { weight: 1, roomName: "Mine_Small_Hidden_ButchersRoom", doorType: "hidden" },
            { weight: 1, roomName: "Mine_Small_Hidden_RatFriendship", doorType: "hidden", requirement: "noRatBond" },
            { weight: 3, roomName: "Mine_Small_Hidden_Chest", doorType: "hidden" },
            { weight: 2, roomName: "Mine_Small_Hidden_Bard", doorType: "hidden", requirement: "thisRunBardNotMet" }
        ],
        "treasure_encounters": [
            { weight: 3, roomName: "Mine_Small_Treasure_Skeleton" },
            { weight: 3, roomName: "Mine_Small_Treasure_Rocks" },
            { weight: 3, roomName: "Mine_Small_Treasure_Spikes" },
            { weight: 2, roomName: "Mine_Small_Treasure_HoleBridges" },
            { weight: 3, roomName: "Mine_Small_Treasure_LockedRocks" },
            { weight: 2, roomName: "Mine_Small_Treasure_StatuePuzzle" },
            { weight: 3, roomName: "Mine_Small_Treasure_LockedBlocks" },
            { weight: 1, roomName: "Mine_Small_Treasure_CursedRelics", doorType: "locked" },
            { weight: 3, roomName: "Mine_Small_Treasure_SpikeCage" },
            { weight: 3, roomName: "Mine_Small_Treasure_RockCage" },
            { weight: 1, roomName: "Mine_Small_Treasure_SpikeSacrifice" },
            { weight: 2, roomName: "Mine_Small_Treasure_DiagonalRocks" },
            { weight: 2, roomName: "Mine_Small_Treasure_HealthLever" },
            { weight: 2, roomName: "Mine_Small_Treasure_Pillar" }
        ],
        "altar": [
            { weight: 2, roomName: "Mine_Small_Altar_Torches", requirement: "priestessMet",
                weightedDoorTypes: [
                    { weight: 1, doorType: "open" },
                    { weight: 1, doorType: "locked" }
                ],
                sequence: { roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1 }
            },
            { weight: 2, roomName: "Mine_Small_Altar_Statues", requirement: "priestessMet",
                weightedDoorTypes: [
                    { weight: 1, doorType: "open" },
                    { weight: 1, doorType: "locked" }
                ],
                sequence: { roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1 }
            },
            { weight: 2, roomName: "Mine_Small_Altar_Bridges", requirement: "priestessMet",
                weightedDoorTypes: [
                    { weight: 1, doorType: "open" },
                    { weight: 1, doorType: "locked" }
                ],
                sequence: { roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1 }
            },
            { weight: 2, roomName: "Mine_Small_Altar_Tiled", requirement: "priestessMet",
                weightedDoorTypes: [
                    { weight: 1, doorType: "open" },
                    { weight: 1, doorType: "locked" }
                ],
                sequence: { roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1 }
            }
        ],
        "altar_locked": [
            { weight: 2, roomName: "Mine_Small_Altar_Torches", doorType: "locked", requirement: "priestessMet", sequence: { roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1 }
            },
            { weight: 2, roomName: "Mine_Small_Altar_Statues", doorType: "locked", requirement: "priestessMet", sequence: { roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1 }
            },
            { weight: 2, roomName: "Mine_Small_Altar_Bridges", doorType: "locked", requirement: "priestessMet", sequence: { roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1 }
            },
            { weight: 2, roomName: "Mine_Small_Altar_Tiled", doorType: "locked", requirement: "priestessMet", sequence: { roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1 }
            }
        ],
        "altar_guacamole": [
            { weight: 2, roomName: "Mine_Small_Altar_Torches", requirement: "guacamole" },
            { weight: 2, roomName: "Mine_Small_Altar_Statues", requirement: "guacamole" },
            { weight: 2, roomName: "Mine_Small_Altar_Bridges", requirement: "guacamole" },
            { weight: 2, roomName: "Mine_Small_Altar_Tiled", requirement: "guacamole" }
        ],
        "easiest_encounters": [
            { weight: 1, roomName: "Mine_Small_Easy_Spinner" },
            { weight: 1, roomName: "Mine_Small_Easy_Spikes" },
            { weight: 3, roomName: "Mine_Small_Easy_Pillar" },
            { weight: 1, roomName: "Mine_Small_Easy_Plain" }
        ],
        "treasure_basic_encounters": [
            { weight: 1, roomName: "Mine_Small_Treasure_Basic_Skeleton" },
            { weight: 1, roomName: "Mine_Small_Treasure_Basic_Rocks" },
            { weight: 1, roomName: "Mine_Small_Treasure_Basic_Plain" },
        ],
        "direct": [
            { weight: 1, roomName: "Mine_Small_End_Normal", roomTag: "end" },
            { weight: 1, roomName: "Mine_Small_End_Worm", roomTag: "end_worm" },
            { weight: 1, roomName: "Mine_Small_End_Tutorial", roomTag: "end_tutorial" },
            { weight: 1, roomName: "Mine_Small_End_Boss", roomTag: "end_boss" },
            { weight: 1, roomName: "Mine_Small_Special_DodsonCage", roomTag: "DodsonCageEncounter", requirement: "dodsonNotRescued" },
            { weight: 1, roomName: "Mine_Small_Special_WaylandShop", roomTag: "waylandshop", requirement: "waylandNotRescued", },
            { weight: 1, roomName: "Mine_Small_Special_WaylandShopHallway", roomTag: "waylandshophallway", doorType: "rock", requirement: "waylandNotRescued" },
            { weight: 1, roomName: "Mine_Small_Special_MushroomFamily", roomTag: "mushroom", doorType: "rock", requirement: "noGreenShroom" },
            { weight: 1, roomName: "Mine_Small_Special_MushroomFarm", roomTag: "mushroom", requirement: "noBlueShroom" },
            { weight: 1, roomName: "Mine_Small_Special_BlackRabbit", roomTag: "black_rabbit_first", requirement: "blackRabbitNotMet" },
            { weight: 1, roomName: "Mine_Small_Special_Hoodie_Locked", roomTag: "hoodie_entrance", doorType: "crystal", requirement: "hoodieNotMet" },
            { weight: 1, roomName: "Mine_Small_Special_Hoodie_Unlocked", roomTag: "hoodie_entrance", requirement: "hoodieMet" },
            { weight: 1, roomName: "Mine_Small_Special_TributeFountain", roomTag: "tribute_fountain", requirement: "thisRunFountainNotFound" },
            { weight: 1, roomName: "Mine_Small_Tutorial_Jump", roomTag: "tutorial_jump" },
            { weight: 1, roomName: "Mine_Small_Tutorial_Attack", roomTag: "tutorial_attack" },
            { weight: 1, roomName: "Mine_Small_Tutorial_Bomb", roomTag: "tutorial_bomb" },
            { weight: 1, roomName: "Mine_Small_Tutorial_Relic", roomTag: "tutorial_relic" },
            { weight: 1, roomName: "Mine_Small_Tutorial_Begin", roomTag: "begin_tutorial" },
            { weight: 1, roomName: "Mine_Small_Tutorial_Secret", roomTag: "tutorial_secret", doorType: "secret" }
        ]
    },
    "mineLarge": {
        "normal_encounters": [
            { weight: 2, roomName: "Mine_Large_Normal_RailStatues" },
            { weight: 2, roomName: "Mine_Large_Normal_LargeRail" },
            { weight: 2, roomName: "Mine_Large_Normal_HoleBridge" },
            { weight: 2, roomName: "Mine_Large_Normal_RailSnake" },
            { weight: 2, roomName: "Mine_Large_Normal_Staging" },
            { weight: 2, roomName: "Mine_Large_Normal_PillarRocks" },
            { weight: 2, roomName: "Mine_Large_Normal_SpikeDonut" },
            { weight: 3, roomName: "Mine_Large_Normal_RailBrideLoop" },
            { weight: 3, roomName: "Mine_Large_Normal_RailBridge" },
            { weight: 1, roomName: "Mine_Large_Normal_OilBarrels" },
            { weight: 2, roomName: "Mine_Large_Normal_MineField" },
            { weight: 2, roomName: "Mine_Large_Normal_Bridges" },
            { weight: 2, roomName: "Mine_Large_Normal_Spikes" },
            { weight: 3, roomName: "Mine_Large_Normal_CornerNE" },
            { weight: 1, roomName: "Mine_Large_Normal_LandBridgeNS" },
            { weight: 2, roomName: "Mine_Large_Normal_DualPillars" },
            { weight: 2, roomName: "Mine_Large_Normal_SpikeBridge" },
            { weight: 3, roomName: "Mine_Large_Normal_CornerSW" },
            { weight: 2, roomName: "Mine_Large_Normal_RockCross" },
            { weight: 2, roomName: "Mine_Large_Normal_SlotHoles" },
            { weight: 2, roomName: "Mine_Large_Normal_RockColumns" },
            { weight: 3, roomName: "Mine_Large_Normal_ATrack" },
            { weight: 3, roomName: "Mine_Large_Normal_DynamicHole" },
            { weight: 2, roomName: "Mine_Large_Normal_TeeRocks" },
            { weight: 3, roomName: "Mine_Large_Normal_HoleArrows" },
            { weight: 1, roomName: "Mine_Large_Normal_DualSetPiece" },
            { weight: 3, roomName: "Mine_Large_Normal_Arena" },
            { weight: 2, roomName: "Mine_Large_Normal_ArenaTrack" },
            { weight: 2, roomName: "Mine_Large_Normal_QuadPillars" },
            { weight: 2, roomName: "Mine_Large_Normal_RockArrowMaze" },
            { weight: 2, roomName: "Mine_Large_Normal_RailGuantlet" },
            { weight: 2, roomName: "Mine_Large_Normal_HazardHeavy" },
            { weight: 2, roomName: "Mine_Large_Normal_ArrowGuantlet" },
            { weight: 2, roomName: "Mine_Large_Normal_DonutSpinner" },
            { weight: 2, roomName: "Mine_Large_Normal_CornerRocks" },
            { weight: 2, roomName: "Mine_Large_Normal_TeeJunction" },
            { weight: 3, roomName: "Mine_Large_Normal_CornerBridge" },
            { weight: 3, roomName: "Mine_Large_Normal_BridgeHole" },
            { weight: 3, roomName: "Mine_Large_Normal_BigRocks" },
            { weight: 3, roomName: "Mine_Large_Normal_TriangleRocks" },
            { weight: 2, roomName: "Mine_Large_Normal_SnakeBridge" },
            { weight: 3, roomName: "Mine_Large_Normal_RandomBlocks" },
            { weight: 3, roomName: "Mine_Large_Normal_Empty" },
            { weight: 4, roomName: "Mine_Large_Normal_TwoSetPiece" },
            { weight: 3, roomName: "Mine_Large_Normal_Grassy" },
            { weight: 2, roomName: "Mine_Large_Normal_FivePillars" },
            { weight: 1, roomName: "Mine_Large_Normal_SnakeTrack" },
            { weight: 3, roomName: "Mine_Large_Normal_Torches" },
            { weight: 2, roomName: "Mine_Large_Normal_RailIslands" },
            { weight: 1, roomName: "Mine_Large_Normal_MushroomGrowOp" }
        ],
        "secret": [
            { weight: 5, roomName: "Mine_Large_Secret_GrassChests", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 1, roomName: "Mine_Large_Secret_Altar", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 5, roomName: "Mine_Large_Secret_Blessing", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 5, roomName: "Mine_Large_Secret_BasicItems", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 5, roomName: "Mine_Large_Secret_Gold", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Large_Secret_BlackRabbitShop", doorType: "secret", requirement: "blackRabbitMet", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 5, roomName: "Mine_Large_Secret_Potion", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 5, roomName: "Mine_Large_Secret_Chest", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Large_Secret_CursedTorch", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 1, roomName: "Mine_Large_Secret_DangerousToGo", doorType: "secret", requirement: "devleCount8+", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 5, roomName: "Mine_Large_Secret_SpikedFood", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 3, roomName: "Mine_Large_Secret_DoubleLockBlock", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 4, roomName: "Mine_Large_Secret_StatueBombPuzzle", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 1, roomName: "Mine_Large_Secret_Pillars", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            },
            { weight: 1, roomName: "Mine_Large_Secret_OilyBridge", doorType: "secret", sequence: { roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement: "circinus" }
            }
        ],
        "hidden": [
            { weight: 2, roomName: "Mine_Large_Hidden_LeverBlocks", doorType: "hidden" },
            { weight: 2, roomName: "Mine_Large_Hidden_GrassChests", doorType: "hidden" },
            { weight: 2, roomName: "Mine_Large_Hidden_TorchPuzzle", doorType: "hidden" },
            { weight: 2, roomName: "Mine_Large_Hidden_Keys", doorType: "hidden" },
            { weight: 2, roomName: "Mine_Large_Hidden_Potions", doorType: "hidden" },
            { weight: 1, roomName: "Mine_Large_Hidden_Blessing", doorType: "hidden" },
            { weight: 1, roomName: "Mine_Large_Hidden_Blessing02", doorType: "hidden" },
            { weight: 1, roomName: "Mine_Large_Hidden_CursedRelics", doorType: "hidden" },
            { weight: 1, roomName: "Mine_Large_Hidden_Altar", doorType: "hidden" },
            { weight: 2, roomName: "Mine_Large_Hidden_PressureTrap", doorType: "hidden" },
            { weight: 2, roomName: "Mine_Large_Hidden_ChooseBlessing", doorType: "hidden" },
            { weight: 2, roomName: "Mine_Large_Hidden_BobosLair", doorType: "hidden" },
            { weight: 2, roomName: "Mine_Large_Hidden_CaveIn", doorType: "hidden" },
            { weight: 1, roomName: "Mine_Large_Hidden_Gap", doorType: "hidden" }
        ],
        "treasure_encounters": [
            { weight: 3, roomName: "Mine_Large_Treasure_ItemBlocks" },
            { weight: 3, roomName: "Mine_Large_Treasure_SpikedChest" },
            { weight: 3, roomName: "Mine_Large_Treasure_HoleSpikeChest" },
            { weight: 3, roomName: "Mine_Large_Treasure_TorchPuzzle" },
            { weight: 3, roomName: "Mine_Large_Treasure_SpikeRails" },
            { weight: 3, roomName: "Mine_Large_Treasure_BridgePuzzle" },
            { weight: 3, roomName: "Mine_Large_Treasure_BombPuzzle" },
            { weight: 4, roomName: "Mine_Large_Treasure_JustSomeTreasure" },
            { weight: 2, roomName: "Mine_Large_Treasure_LeverBridge" },
            { weight: 3, roomName: "Mine_Large_Treasure_VerticalBridge" },
            { weight: 4, roomName: "Mine_Large_Treasure_Decision" },
            { weight: 3, roomName: "Mine_Large_Treasure_HealthLever" },
            { weight: 5, roomName: "Mine_Large_Treasure_SecretShop", doorType: "crystal", requirement: "dibbleNotComplete" },
            { weight: 2, roomName: "Mine_Large_Treasure_OilChest" },
            { weight: 2, roomName: "Mine_Large_Treasure_FireyChest" },
            { weight: 2, roomName: "Mine_Large_Treasure_ElectrifiedChest" },
            { weight: 4, roomName: "Mine_Large_Treasure_JustSomeTreasure02" },
            { weight: 2, roomName: "Mine_Large_Treasure_Nexus" },
            { weight: 1, roomName: "Mine_Large_Treasure_TwoBombsOneKey" },
            { weight: 2, roomName: "Mine_Large_Treasure_SpikeSacrifice" },
            { weight: 2, roomName: "Mine_Large_Treasure_Choice" },
            { weight: 2, roomName: "Mine_Large_Treasure_DoubleRail" },
            { weight: 1, roomName: "Mine_Large_Treasure_RockLock" }
        ],
        "challange": [
            { weight: 1, roomName: "Mine_Large_Challenge_GamblingRoom" },
            { weight: 1, roomName: "Mine_Large_Challenge_Combat" }
        ],
        "shop": [
            { weight: 1, roomName: "Encounter_Shop", roomTag: "shop",
                weightedDoorTypes: [
                    { weight: 10, doorType: "open" },
                    { weight: 7, doorType: "locked" }
                ],
            }
        ],
        "direct": [
            { weight: 5, roomName: "Mine_Large_Special_RockMimic", roomTag: "RockMimicEncounter", requirement: "noDodsonKey" },
            { weight: 5, roomName: "Mine_Large_Special_MushroomDarkness", roomTag: "mushroom", doorType: "rock", requirement: "noPurpleShroom" },
            { weight: 5, roomName: "Mine_Large_Special_AlchemistApprentice0", roomTag: "mushroom_apprentice", requirement: "apprenticeNotMet" },
            { weight: 5, roomName: "Mine_Large_Special_AlchemistApprentice3", roomTag: "mushroom_apprentice", requirement: "haveAllShrooms" },
            { weight: 5, roomName: "Mine_Large_Special_RelicAltar", roomTag: "relic_altar", requrement: "thisRunAltarNotFound" },
            { weight: 1, roomName: "Mine_Large_Tutorial_Throw", doorType: "locked", roomTag: "tutorial_throw" },
            { weight: 1, roomName: "Mine_Large_Tutorial_Pilfer", roomTag: "tutorial_pilfer" },
            { weight: 1, roomName: "Encounter_BR_TreasureGame", roomTag: "black_rabbit" }
        ]
    },
    "SleepyHoodyRoom": {
        "hoody": [
            { weight: 1, roomName: "SleepyHoodyRoom", roomTag: "hoodie_entrance" }
        ]
    }
};
const trial = {
    discoveredRatBond: false,
    whip_enabled: true,
    itemCircinus: true,
    bard_met: false,
    itemFreedom: true
};
var direction;
(function (direction) {
    direction[direction["none"] = 0] = "none";
    direction[direction["north"] = 1] = "north";
    direction[direction["east"] = 2] = "east";
    direction[direction["south"] = 3] = "south";
    direction[direction["west"] = 4] = "west";
    direction[direction["ne"] = 5] = "ne";
    direction[direction["ns"] = 6] = "ns";
    direction[direction["nw"] = 7] = "nw";
    direction[direction["nes"] = 8] = "nes";
    direction[direction["new"] = 9] = "new";
    direction[direction["nsw"] = 10] = "nsw";
    direction[direction["es"] = 11] = "es";
    direction[direction["ew"] = 12] = "ew";
    direction[direction["esw"] = 13] = "esw";
    direction[direction["sw"] = 14] = "sw";
})(direction || (direction = {}));
var icon;
(function (icon) {
    icon[icon["none"] = 0] = "none";
    icon[icon["start"] = 1] = "start";
    icon[icon["boss"] = 2] = "boss";
    icon[icon["exit"] = 3] = "exit";
    icon[icon["relicOn"] = 4] = "relicOn";
    icon[icon["altarOn"] = 5] = "altarOn";
    icon[icon["relicAltar"] = 6] = "relicAltar";
    icon[icon["secret"] = 7] = "secret";
    icon[icon["exlamaiton"] = 8] = "exlamaiton";
    icon[icon["shopBR"] = 9] = "shopBR";
    icon[icon["shop"] = 10] = "shop";
    icon[icon["combat"] = 11] = "combat";
    icon[icon["new"] = 12] = "new";
    icon[icon["hoody"] = 13] = "hoody";
    icon[icon["fountain"] = 14] = "fountain";
    icon[icon["exlamation"] = 15] = "exlamation";
})(icon || (icon = {}));
var door;
(function (door) {
    door[door["normal"] = 0] = "normal";
    door[door["iron"] = 1] = "iron";
    door[door["rock"] = 2] = "rock";
    door[door["crystal"] = 3] = "crystal";
    door[door["locked"] = 4] = "locked";
    door[door["secret"] = 5] = "secret";
    door[door["hidden"] = 6] = "hidden";
})(door || (door = {}));
const encounters = {
    mine: {
        small: {
            begin: {
                rooms: [
                    [4, { name: "begin" }],
                ],
                shared: {
                    icon: 1,
                    sequence: { tag: "hoodie_entrance", direction: 1,
                        requirements: (flag) => (flag.storyMode),
                    },
                },
            },
            end: {
                rooms: [
                    [1, { name: "Normal", tag: "end" }],
                    [1, { name: "Worm", icon: 2, tag: "end_worm" }],
                    [1, { name: "Boss", icon: 2, tag: "end_boss" }],
                    [1, { name: "Tutorial", tag: "end_tutorial" }],
                ],
                shared: {
                    icon: 3,
                },
            },
            tutorial: {
                rooms: [
                    [1, {
                            name: "Begin",
                            icon: 1,
                            tag: "begin_tutorial",
                            sequence: { tag: "tutorial_secret", direction: 1 },
                        }],
                    [1, { name: "Jump", tag: "tutorial_jump" }],
                    [1, { name: "Attack", tag: "tutorial_attack" }],
                    [1, { name: "Bomb", tag: "tutorial_bomb" }],
                    [1, { name: "Relic", icon: 4, tag: "tutorial_relic" }],
                    [1, { name: "Secret", icon: 7, tag: "tutorial_secret" }],
                ],
            },
            easy: {
                rooms: [
                    [1, { name: "Spinner" }],
                    [1, { name: "Spikes" }],
                    [3, { name: "Pillar" }],
                    [1, { name: "Plain" }],
                ],
            },
            normal: {
                rooms: [
                    [3, { name: "MineCart" }],
                    [3, { name: "Pillar" }],
                    [3, { name: "PillarHole" }],
                    [3, { name: "PillarSpinner" }],
                    [3, { name: "RockWall" }],
                    [3, { name: "SouthNorthHole" }],
                    [3, { name: "StationarySpinners" }],
                    [3, { name: "BrokenCarts" }],
                    [3, { name: "StatueSpinner" }],
                    [2, { name: "Bridge" }],
                    [3, { name: "EWSpinners", noExit: 6 }],
                    [3, { name: "CornerHoles" }],
                    [3, { name: "DualPillar" }],
                    [3, { name: "Spikes" }],
                    [3, { name: "SpikePatch" }],
                    [3, { name: "PillarSpawner" }],
                    [1, { name: "SetPiece" }],
                    [2, { name: "HoleEW", noExit: 6 }],
                    [2, { name: "HoleEWSpinner", noExit: 6 }],
                    [4, { name: "Plain" }],
                    [2, { name: "HazardHeavy" }],
                    [2, { name: "DangerWalls", noExit: 12 }],
                    [3, { name: "TilePattern" }],
                    [3, { name: "CornerRocks" }],
                    [2, { name: "RockPath" }],
                    [3, { name: "DiagonalHole" }],
                    [3, { name: "CenterTorches" }],
                    [2, { name: "Ruins" }],
                    [3, { name: "Statues" }],
                    [3, { name: "LargeSpinnerTrack" }],
                ],
            },
            special: {
                rooms: [
                    {
                        name: "DodsonCage",
                        icon: 8,
                        tag: "DodsonCageEncounter",
                        requirements: (flag) => (!flag.peasant1_unlocked && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "WaylandShop",
                        icon: 8,
                        tag: "waylandshop",
                        noExit: 9,
                        door: 2,
                        requirements: (flag) => ((!flag.waylandBootsFound || !flag.blacksmith_rescued) && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "WaylandShopHallway",
                        tag: "waylandshophallway",
                        requirements: (flag) => ((!flag.waylandBootsFound || !flag.blacksmith_rescued) && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "MushroomFamily",
                        tag: "mushroom",
                        noExit: 1,
                        door: 2,
                        requirements: (flag) => (!flag.mushroom_green && flag.apprentice_met && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "MushroomFarm",
                        tag: "mushroom",
                        requirements: (flag) => (!flag.mushroom_blue && flag.apprentice_met && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "BlackRabbit",
                        icon: 9,
                        tag: "black_rabbit_first",
                        noExit: 10,
                        requirements: (flag) => (!flag.black_rabbit_met && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "Hoodie_Locked",
                        tag: "hoodie_entrance",
                        door: 3,
                        requirements: (flag) => (flag.rockmimic_defeated && !flag.hoodie_met_mine && (flag.floor_number == 1) && flag.storyMode),
                    },
                    {
                        name: "Hoodie_Unlocked",
                        icon: 13,
                        tag: "hoodie_entrance",
                        requirements: (flag) => (flag.rockmimic_defeated && flag.hoodie_met_mine && (flag.floor_number == 1) && flag.storyMode),
                    },
                    {
                        name: "TributeFountain",
                        icon: 14,
                        tag: "tribute_fountain",
                        requirements: (flag) => (flag.storyMode && !flag.ribute_fountain_encountered && flag.bog_unlocked),
                    },
                ],
            },
            relic: {
                rooms: [
                    [4, { name: "Torches" }],
                    [4, { name: "Pots" }],
                    [4, { name: "Hole", noExit: 8 }],
                    [1, { name: "TorchPuzzle", noExit: 1 }],
                    [4, { name: "Statues" }],
                ],
                shared: {
                    icon: 4,
                    door: 4,
                    requirements: (flag) => (!flag.itemFreedom),
                },
                unlocked: {
                    shared: {
                        door: 0,
                    },
                },
            },
            secret: {
                rooms: [
                    [4, { name: "WaterChest" }],
                    [4, { name: "Carts" }],
                    [1, { name: "Altar" }],
                    [3, { name: "CursedTorch" }],
                    [3, { name: "Crystals" }],
                    [4, { name: "Chest" }],
                    [3, { name: "SpikeSacrifice" }],
                    [1, { name: "Blessing" }],
                    [3, { name: "Items" }],
                    [3, { name: "Chest" }],
                    [3, { name: "ChestCommon" }],
                    [3, { name: "KeyBlock" }],
                    [3, { name: "Bombs" }],
                    [10, { name: "DogShadow",
                            requirements: (flag) => (!flag.dog_shadow_found && (flag.delve_count > 5) && !flag.whip_enabled),
                        }],
                    [2, { name: "LeverBlocks", noExit: 1 }],
                    [1, { name: "Tent" }],
                    [2, { name: "Nugg" }],
                    [3, { name: "Bard",
                            requirements: (flag) => (!flag.bard_met),
                        }],
                    [3, { name: "TributeFountain", icon: 14,
                            requirements: (flag) => (flag.storyMode && flag.bog_unlocked),
                        }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [3, { name: "WaterChest" }],
                    [3, { name: "Carts" }],
                    [1, { name: "TreasureHunt", noExit: 1,
                            requirements: (flag) => (!flag.secret_treasure_note && !flag.whip_enabled),
                        }],
                    [1, { name: "Altar" }],
                    [2, { name: "CursedTorch" }],
                    [2, { name: "CursedRelic" }],
                    [3, { name: "Crystals" }],
                    [1, { name: "Lab" }],
                    [3, { name: "Chest" }],
                    [3, { name: "SpikeSacrifice" }],
                    [1, { name: "Blessing" }],
                    [1, { name: "Blessing02" }],
                    [1, { name: "ButchersRoom" }],
                    [1, { name: "RatFriendship", tag: "mrrat",
                            requirements: (flag) => (!flag.discoveredRatBond && !flag.whip_enabled),
                        }],
                    [3, { name: "Chest" }],
                    [2, { name: "Bard",
                            requirements: (flag) => (!flag.bard_met),
                        }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            treasure: {
                rooms: [
                    [3, { name: "Skeleton" }],
                    [3, { name: "Rocks" }],
                    [3, { name: "Spikes" }],
                    [2, { name: "HoleBridges" }],
                    [3, { name: "LockedRocks", noExit: 3 }],
                    [2, { name: "StatuePuzzle" }],
                    [3, { name: "LockedBlocks", noExit: 1 }],
                    [1, { name: "CursedRelics", door: 4 }],
                    [3, { name: "SpikeCage" }],
                    [3, { name: "RockCage" }],
                    [1, { name: "SpikeSacrifice" }],
                    [2, { name: "DiagonalRocks" }],
                    [2, { name: "HealthLever", noExit: 3 }],
                    [2, { name: "Pillar" }],
                ],
            },
            treasureBasic: {
                rooms: [
                    [1, { name: "Skeleton" }],
                    [1, { name: "Rocks" }],
                    [1, { name: "Plain" }],
                ],
            },
            altar: {
                rooms: [
                    [2, { name: "Torches" }],
                    [2, { name: "Statues" }],
                    [2, { name: "Bridges" }],
                    [2, { name: "Tiled", noExit: 3 }],
                ],
                shared: {
                    icon: 5,
                    sequence: { tag: "altar_guacamole" },
                    weightedDoor: [
                        [1, { door: 0 }],
                        [1, { door: 4 }],
                    ],
                    requirements: (flag) => (flag.priestess_met > 2),
                },
                locked: {
                    shared: {
                        weightedDoor: null,
                        door: 4,
                    },
                },
            },
            altarGuacamole: {
                rooms: [
                    [2, { name: "Torches" }],
                    [2, { name: "Statues" }],
                    [2, { name: "Bridges" }],
                    [2, { name: "Tiled", noExit: 3,
                            requirements: (flag) => (flag.guacamole > 2),
                        }],
                ],
                shared: {
                    icon: 5,
                    requirements: (flag) => (flag.guacamole),
                },
            }
        },
        large: {
            normal: {
                rooms: [
                    [2, { name: "RailStatues" }],
                    [2, { name: "LargeRail" }],
                    [2, { name: "HoleBridge" }],
                    [2, { name: "RailSnake" }],
                    [2, { name: "Staging" }],
                    [2, { name: "PillarRocks" }],
                    [2, { name: "SpikeDonut" }],
                    [3, { name: "RailBrideLoop" }],
                    [3, { name: "RailBridge" }],
                    [1, { name: "OilBarrels" }],
                    [2, { name: "MineField" }],
                    [2, { name: "Bridges" }],
                    [2, { name: "Spikes" }],
                    [3, { name: "CornerNE", noExit: 14 }],
                    [1, { name: "LandBridgeNS", noExit: 12 }],
                    [2, { name: "DualPillars" }],
                    [2, { name: "SpikeBridge", noExit: 6 }],
                    [3, { name: "CornerSW", noExit: 5 }],
                    [2, { name: "RockCross" }],
                    [2, { name: "SlotHoles" }],
                    [2, { name: "RockColumns" }],
                    [3, { name: "ATrack" }],
                    [3, { name: "DynamicHole" }],
                    [2, { name: "TeeRocks" }],
                    [3, { name: "HoleArrows" }],
                    [1, { name: "DualSetPiece" }],
                    [3, { name: "Arena", noExit: 12 }],
                    [2, { name: "ArenaTrack", noExit: 12 }],
                    [2, { name: "QuadPillars" }],
                    [2, { name: "RockArrowMaze" }],
                    [2, { name: "RailGuantlet", noExit: 6 }],
                    [2, { name: "HazardHeavy" }],
                    [2, { name: "ArrowGuantlet" }],
                    [2, { name: "DonutSpinner", noExit: 6 }],
                    [2, { name: "CornerRocks" }],
                    [2, { name: "TeeJunction", noExit: 1 }],
                    [3, { name: "CornerBridge" }],
                    [3, { name: "BridgeHole" }],
                    [3, { name: "BigRocks" }],
                    [3, { name: "TriangleRocks" }],
                    [2, { name: "SnakeBridge" }],
                    [3, { name: "RandomBlocks" }],
                    [3, { name: "Empty" }],
                    [4, { name: "TwoSetPiece" }],
                    [3, { name: "Grassy" }],
                    [2, { name: "FivePillars" }],
                    [1, { name: "SnakeTrack" }],
                    [3, { name: "Torches" }],
                    [2, { name: "RailIslands" }],
                    [1, { name: "MushroomGrowOp" }],
                ],
            },
            special: {
                rooms: [
                    {
                        name: "RockMimic",
                        tag: "RockMimicEncounter",
                        requirements: (flag) => (!flag.prisoner_key && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "MushroomDarkness",
                        tag: "mushroom",
                        door: 2,
                        requirements: (flag) => (!flag.mushroom_purple && flag.apprentice_met && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "AlchemistApprentice0",
                        icon: 8,
                        tag: "mushroom_apprentice",
                        requirements: (flag) => (!flag.apprentice_met && flag.blacksmith_rescued && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "AlchemistApprentice3",
                        icon: 8,
                        tag: "mushroom_apprentice",
                        requirements: (flag) => ((flag.apprentice_met == 4) && flag.blacksmith_rescued && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "RelicAltar",
                        icon: 6,
                        tag: "relic_altar",
                        upgrade: "relicAltar",
                        requirements: (flag) => (!flag.altar_encountered && !flag.whip_enabled),
                    },
                ],
            },
            secret: {
                rooms: [
                    [5, { name: "GrassChests" }],
                    [1, { name: "Altar" }],
                    [5, { name: "Blessing" }],
                    [5, { name: "BasicItems" }],
                    [5, { name: "Gold" }],
                    [3, { name: "BlackRabbitShop",
                            requirements: (flag) => (flag.black_rabbit_met > 0),
                        }],
                    [5, { name: "Potion" }],
                    [5, { name: "Chest" }],
                    [3, { name: "CursedTorch" }],
                    [1, { name: "DangerousToGo", noExit: 9,
                            requirements: (flag) => (flag.delve_count > 8),
                        }],
                    [5, { name: "SpikedFood" }],
                    [3, { name: "DoubleLockBlock", noExit: 1 }],
                    [4, { name: "StatueBombPuzzle" }],
                    [1, { name: "Pillars" }],
                    [1, { name: "OilyBridge", noExit: 8 }],
                    [1, { name: "DarkMaze" }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [2, { name: "Mine_Large_Hidden_LeverBlocks" }],
                    [2, { name: "Mine_Large_Hidden_GrassChests" }],
                    [2, { name: "Mine_Large_Hidden_TorchPuzzle" }],
                    [2, { name: "Mine_Large_Hidden_Keys" }],
                    [2, { name: "Mine_Large_Hidden_Potions" }],
                    [1, { name: "Mine_Large_Hidden_Blessing" }],
                    [1, { name: "Mine_Large_Hidden_Blessing02" }],
                    [1, { name: "Mine_Large_Hidden_CursedRelics" }],
                    [1, { name: "Mine_Large_Hidden_Altar", noExit: 1 }],
                    [2, { name: "Mine_Large_Hidden_PressureTrap", noExit: 5 }],
                    [2, { name: "Mine_Large_Hidden_ChooseBlessing" }],
                    [2, { name: "Mine_Large_Hidden_BobosLair" }],
                    [2, { name: "Mine_Large_Hidden_CaveIn" }],
                    [1, { name: "Mine_Large_Hidden_Gap" }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            tutorial: {
                rooms: [
                    [1, { name: "Throw", tag: "tutorial_throw", doorOverride: 2 }],
                    [1, { name: "Pilfer", tag: "tutorial_pilfer" }],
                ],
            },
            treasure: {
                rooms: [
                    [3, { name: "ItemBlocks" }],
                    [3, { name: "SpikedChest", noExit: 3 }],
                    [3, { name: "HoleSpikeChest", noExit: 4 }],
                    [3, { name: "TorchPuzzle" }],
                    [3, { name: "SpikeRails", noExit: 9 }],
                    [3, { name: "BridgePuzzle", noExit: 6 }],
                    [3, { name: "BombPuzzle" }],
                    [4, { name: "JustSomeTreasure", noExit: 1 }],
                    [2, { name: "LeverBridge", noExit: 4 }],
                    [3, { name: "VerticalBridge" }],
                    [4, { name: "Decision", noExit: 3 }],
                    [3, { name: "HealthLever" }],
                    [5, { name: "SecretShop", icon: 10, door: 3,
                            requirements: (flag) => (flag.peasant2_unlocked && (flag.dibble_upgrade_count < 4) && flag.storyMode),
                        }],
                    [2, { name: "OilChest" }],
                    [2, { name: "FireyChest" }],
                    [2, { name: "ElectrifiedChest" }],
                    [4, { name: "JustSomeTreasure02" }],
                    [2, { name: "Nexus" }],
                    [1, { name: "TwoBombsOneKey" }],
                    [2, { name: "SpikeSacrifice" }],
                    [2, { name: "Choice" }],
                    [2, { name: "DoubleRail" }],
                    [1, { name: "RockLock" }],
                ],
            },
            challange: {
                rooms: [
                    [1, { name: "GamblingRoom", icon: 9 }],
                    [1, { name: "Combat", icon: 11 }],
                ],
            },
        },
    },
    dungeon: {
        small: {
            begin: {
                rooms: [
                    [3, { name: "Begin_Holes" }],
                    [3, { name: "Begin_Plain" }],
                    [3, { name: "Begin_Statues" }],
                    [1, { name: "Begin_Squeeze" }],
                    [2, { name: "Begin_Cells" }],
                ],
                shared: {
                    icon: 1,
                    sequence: { tag: "hoodie_entrance", direction: 1,
                        requirements: (flag) => (flag.storyMode),
                    },
                },
            },
            end: {
                rooms: [
                    [1, { name: "End", tag: "end" }],
                    [1, { name: "Boss", icon: 2, tag: "end_boss" }],
                ],
                shared: {
                    icon: 3,
                },
            },
            normal: {
                rooms: [
                    [3, { name: "Spikes" }],
                    [3, { name: "LongHole" }],
                    [3, { name: "Pillars", noExit: 12 }],
                    [3, { name: "Water" }],
                    [3, { name: "Torches" }],
                    [3, { name: "DynamicPillar" }],
                    [1, { name: "ArrowBridge", noExit: 6 }],
                    [1, { name: "FlamingArrows", noExit: 12 }],
                    [3, { name: "TallBlocks" }],
                    [1, { name: "SetPiece" }],
                    [2, { name: "Track" }],
                    [3, { name: "Empty" }],
                    [3, { name: "SmallBowTie", noExit: 6 }],
                    [3, { name: "RazorBlade", noExit: 12 }],
                    [2, { name: "VerticalHole", noExit: 6 }],
                ],
            },
            special: {
                rooms: [
                    {
                        name: "Entrance",
                        icon: 3,
                        tag: "dungeon_entrance",
                        door: 1,
                        requirements: (flag) => (flag.storyMode),
                    },
                    {
                        name: "DibblesStoreRoom",
                        icon: 8,
                        tag: "store_room",
                        door: 5,
                        requirements: (flag) => (!flag.peasant2_unlocked && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "Library",
                        tag: "dungeonlibrary",
                        door: 4,
                        requirements: (flag) => (!flag.collector_book && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "PriestessEntrance",
                        tag: "priestess",
                        sequence: { tag: "priestesshall1" },
                        requirements: (flag) => (!flag.priestess_met && !flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "Hoodie_Locked",
                        tag: "hoodie_entrance",
                        door: 3,
                        requirements: (flag) => (!flag.hoodie_met_dungeon && (flag.floor_number == 5) && flag.storyMode),
                    },
                    {
                        name: "Hoodie_Unlocked",
                        icon: 13,
                        tag: "hoodie_entrance",
                        requirements: (flag) => (flag.hoodie_met_dungeon && (flag.floor_number == 5) && flag.storyMode),
                    },
                    {
                        name: "TributeFountain",
                        icon: 14,
                        tag: "tribute_fountain",
                        requirements: (flag) => (flag.storyMode && !flag.tribute_fountain_encountered && flag.bog_unlocked),
                    },
                ],
            },
            relic: {
                rooms: [
                    [3, { name: "Statues" }],
                    [3, { name: "Water" }],
                    [2, { name: "Pillars", noExit: 12 }],
                    [3, { name: "WindingBridge", noExit: 1 }],
                    [3, { name: "Holes" }],
                ],
                shared: {
                    icon: 4,
                    door: 4,
                    requirements: (flag) => (!flag.itemFreedom),
                },
                unlocked: {
                    shared: {
                        door: 0,
                    },
                },
            },
            treasure: {
                rooms: [
                    [3, { name: "StatueChest" }],
                    [3, { name: "CellNE", noExit: 5 }],
                    [3, { name: "CellsEW", noExit: 12 }],
                    [3, { name: "DiamondFloor" }],
                    [3, { name: "CellN", noExit: 1 }],
                    [3, { name: "CellE", noExit: 8 }],
                    [3, { name: "CellW", noExit: 10 }],
                    [3, { name: "BrickStatue" }],
                    [3, { name: "SpikedChest" }],
                    [1, { name: "SpikedHallwayW", noExit: 10 }],
                    [1, { name: "SpikedHallwayE", noExit: 9 }],
                    [3, { name: "Track" }],
                    [1, { name: "TinyRoom", noExit: 9 }],
                    [2, { name: "HealthLever" }],
                    [3, { name: "JustAChest" }],
                ],
            },
            secret: {
                rooms: [
                    [5, { name: "OpenedChest" }],
                    [5, { name: "WaterChest" }],
                    [3, { name: "SpikeSacrifice" }],
                    [3, { name: "CursedTorch" }],
                    [3, { name: "BombStorage" }],
                    [1, { name: "Altar" }],
                    [3, { name: "StorageRoom" }],
                    [3, { name: "DualLevers" }],
                    [5, { name: "Potion" }],
                    [1, { name: "Blessing" }],
                    [10, { name: "DogEngine",
                            requirements: (flag) => (flag.dog_engine_found && (flag.delve_count > 6) && !flag.whip_enabled),
                        }],
                    [3, { name: "Talisman",
                            requirements: (flag) => (flag.priestess_met > 2),
                        }],
                    [2, { name: "KeyPillar" }],
                    [1, { name: "BigChest" }],
                    [2, { name: "Nugg" }],
                    [3, { name: "Bard",
                            requirements: (flag) => (!flag.bard_met),
                        }],
                    [3, { name: "TributeFountain", icon: 14,
                            requirements: (flag) => (flag.storyMode && flag.bog_unlocked),
                        }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [10, { name: "Kurtz", tag: "kurtz", noExit: 6 }],
                    [3, { name: "DoubleChest" }],
                    [3, { name: "GoldStatue" }],
                    [3, { name: "WaterChest" }],
                    [3, { name: "SpikeSacrifice" }],
                    [3, { name: "CursedTorch" }],
                    [3, { name: "BombStorage" }],
                    [1, { name: "TripleCursedChest" }],
                    [1, { name: "DoubleBlessing" }],
                    [1, { name: "Lab" }],
                    [2, { name: "CursedRelic" }],
                    [1, { name: "PyroLair" }],
                    [3, { name: "StatueChest" }],
                    [3, { name: "CostedLever" }],
                    [1, { name: "CursedRelic" }],
                    [1, { name: "FourBigChests" }],
                    [2, { name: "Bard" }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            altar: {
                rooms: [
                    [1, { name: "Pillars" }],
                    [1, { name: "CellE" }],
                    [1, { name: "Statues" }],
                ],
                shared: {
                    icon: 5,
                    sequence: { tag: "altar_guacamole" },
                    weightedDoor: [
                        [1, { door: 0 }],
                        [1, { door: 4 }],
                    ],
                    requirements: (flag) => (flag.priestess_met > 2),
                },
                locked: {
                    shared: {
                        weightedDoor: null,
                        door: 4,
                    },
                },
                guacamole: {
                    shared: {
                        weightedDoor: null,
                        sequence: null,
                        requirements: (flag) => (flag.guacamole),
                    },
                },
            }
        },
        large: {
            normal: {
                rooms: [
                    [3, { name: "CenterTurret" }],
                    [3, { name: "Flooded" }],
                    [3, { name: "DualPillar" }],
                    [3, { name: "SlotHoles" }],
                    [3, { name: "CornerWater" }],
                    [3, { name: "BridgeEW", noExit: 6 }],
                    [3, { name: "BridgeNS", noExit: 12 }],
                    [2, { name: "BendNE", noExit: 14 }],
                    [1, { name: "BendNEPillar", noExit: 14 }],
                    [2, { name: "BendSW", noExit: 5 }],
                    [1, { name: "BendSWPillar", noExit: 5 }],
                    [3, { name: "BallChainDynamic" }],
                    [3, { name: "BallChain" }],
                    [3, { name: "HolesBlocks" }],
                    [3, { name: "DynamicShape" }],
                    [3, { name: "Cells" }],
                    [1, { name: "Guantlet", noExit: 6 }],
                    [1, { name: "Furnace" }],
                    [1, { name: "Turrets" }],
                    [3, { name: "DynamicHole" }],
                    [3, { name: "Gutters" }],
                    [3, { name: "Blocks" }],
                    [3, { name: "Sewer" }],
                    [3, { name: "CornerTurrets" }],
                    [2, { name: "SpikeStrip", noExit: 6 }],
                    [3, { name: "Cross" }],
                    [3, { name: "Ess", noExit: 6 }],
                    [3, { name: "DonutSpinner" }],
                    [3, { name: "Plain" }],
                    [3, { name: "HazardHeavy" }],
                    [3, { name: "Pools" }],
                    [3, { name: "ElBlocks" }],
                    [3, { name: "BowTie", noExit: 6 }],
                    [3, { name: "RazorBlade", noExit: 12 }],
                    [2, { name: "WestDiagonal", noExit: 4 }],
                    [2, { name: "EastDiagonal", noExit: 2 }],
                    [1, { name: "FireWitchHunt" }],
                    [1, { name: "FurnacePart2" }],
                    [2, { name: "SlidingWall" }],
                    [2, { name: "SlantedPillars" }],
                    [2, { name: "CornerSlants" }],
                    [1, { name: "SewerPart2", noExit: 6 }],
                    [3, { name: "SewerPart3" }],
                    [2, { name: "SewerPart4" }],
                    [1, { name: "VerticalHall", noExit: 12 }],
                    [3, { name: "CornerPillar" }],
                    [3, { name: "OffsetTurrets" }],
                    [2, { name: "MorningStarBridge", noExit: 1 }],
                ],
            },
            treasure: {
                rooms: [
                    [4, { name: "CornerTurrets" }],
                    [4, { name: "RockTurret" }],
                    [4, { name: "StatuePuzzle" }],
                    [4, { name: "CrystalHole", noExit: 12 }],
                    [4, { name: "TorchPuzzle", noExit: 12 }],
                    [4, { name: "DoubleCell", noExit: 9 }],
                    [4, { name: "CellBlock" }],
                    [4, { name: "SpikeSacrifice" }],
                    [3, { name: "SetPiece" }],
                    [2, { name: "DoubleSetPiece", noExit: 1 }],
                    [4, { name: "JustSomeTreasure" }],
                    [3, { name: "HealthLever" }],
                    [3, { name: "Guantlet" }],
                    [5, { name: "SecretShop", icon: 10, door: 3,
                            requirements: (flag) => (flag.peasant2_unlocked && (flag.dibble_upgrade_count < 4) && flag.storyMode),
                        }],
                    [3, { name: "TurretDodging" }],
                    [3, { name: "BarrelTimer", noExit: 14 }],
                    [1, { name: "BladeBridge" }],
                    [2, { name: "Choice" }],
                    [1, { name: "SpikeWave", noExit: 4 }],
                    [1, { name: "StoreHouse" }],
                ],
            },
            secret: {
                rooms: [
                    [1, { name: "Altar" }],
                    [3, { name: "BlackRabbitShop",
                            requirements: (flag) => (flag.black_rabbit_met),
                        }],
                    [5, { name: "Chest" }],
                    [5, { name: "TorchPuzzle" }],
                    [5, { name: "Cells" }],
                    [5, { name: "Chest02" }],
                    [5, { name: "Gold" }],
                    [4, { name: "Bombs" }],
                    [4, { name: "Keys" }],
                    [1, { name: "Blessing" }],
                    [4, { name: "ChestItem" }],
                    [3, { name: "Talisman",
                            requirements: (flag) => (flag.priestess_met > 2),
                        }],
                    [1, { name: "Garden", noExit: 13 }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [1, { name: "AltarCell" }],
                    [2, { name: "WaterChest" }],
                    [1, { name: "Altar" }],
                    [2, { name: "ItemRocks" }],
                    [2, { name: "TorchPuzzle" }],
                    [2, { name: "Keys" }],
                    [2, { name: "Potions" }],
                    [2, { name: "DoubleWall" }],
                    [1, { name: "BlessingChoice" }],
                    [2, { name: "CellChests" }],
                    [2, { name: "DoubleLeverTrap" }],
                    [2, { name: "TorchTurretPuzzle" }],
                    [2, { name: "Gap" }],
                    [2, { name: "JumpTorchPuzzle" }],
                    [1, { name: "PressurePlate" }],
                    [1, { name: "Islands" }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            special: {
                rooms: [
                    {
                        name: "DibblesEmporium",
                        icon: 8,
                        tag: "dibble",
                        noExit: 12,
                        sequence: { tag: "store_room", direction: 1 },
                        requirements: (flag) => (!flag.peasant2_unlocked && !flag.whip_enabled && flag.storyMode)
                    },
                    {
                        name: "PriestessHall1",
                        tag: "priestesshall1",
                        noExit: 12,
                        requirements: (flag) => (!flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "PriestessHall2",
                        tag: "priestesshall2",
                        noExit: 12,
                        requirements: (flag) => (!flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "PriestessHall3",
                        tag: "priestesshall3",
                        noExit: 12,
                        requirements: (flag) => (!flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "Priestess",
                        icon: 8,
                        tag: "priestess_main",
                        noExit: 9,
                        requirements: (flag) => (!flag.peasant2_unlocked && !flag.whip_enabled && flag.storyMode)
                    },
                    {
                        name: "MastersKey",
                        icon: 2,
                        tag: "masters_key",
                        noExit: 9,
                        requirements: (flag) => (flag.priestess_met && !flag.masters_key && !flag.whip_enabled && flag.storyMode)
                    },
                    {
                        name: "StonelordEntrance",
                        icon: 2,
                        tag: "end_stone",
                        requirements: (flag) => (flag.storyMode),
                    },
                    {
                        name: "RelicAltar",
                        icon: 6,
                        tag: "relic_altar",
                        upgrade: "relicAltar",
                        requirements: (flag) => (!flag.altar_encountered && !flag.whip_enabled),
                    },
                ],
            },
            relic: {
                rooms: [
                    [1, { name: "Dungeon_Large_Relic_Torches" }],
                    [1, { name: "Dungeon_Large_Relic_Circle" }],
                    [1, { name: "Dungeon_Large_Relic_Cell" }],
                ],
                shared: {
                    icon: 4,
                    door: 4,
                    requirements: (flag) => (!flag.itemFreedom),
                },
                unlocked: {
                    shared: {
                        door: 0,
                    },
                },
            },
            challange: {
                rooms: [
                    [1, { name: "GamblingRoom", icon: 9 }],
                    [1, { name: "Combat", icon: 11 }],
                ],
            },
        },
    },
    hall: {
        small: {
            begin: {
                rooms: [
                    [1, { name: "Holes" }],
                    [1, { name: "Statues" }],
                    [1, { name: "Water" }],
                    [1, { name: "Pillars" }],
                    [1, { name: "Pillars02" }],
                    [1, { name: "Torches" }],
                ],
                shared: {
                    icon: 1,
                    sequence: { tag: "hoodie_entrance", direction: 1,
                        requirements: (flag) => (flag.storyMode),
                    },
                },
            },
            end: {
                rooms: [
                    [1, { name: "End", tag: "end" }],
                    [1, { name: "Boss", icon: 2, tag: "end_boss" }],
                ],
                shared: {
                    icon: 3,
                },
            },
            normal: {
                rooms: [
                    [5, { name: "OddWalls" }],
                    [5, { name: "Torches" }],
                    [5, { name: "CornerRocks" }],
                    [5, { name: "TallRocks" }],
                    [5, { name: "Empty" }],
                    [5, { name: "Corners" }],
                    [5, { name: "CenterHole" }],
                    [4, { name: "DiagonalRocks" }],
                    [3, { name: "BridgeEW", noExit: 6 }],
                    [3, { name: "BridgeNS", noExit: 12 }],
                    [3, { name: "TallRocksEast", noExit: 2 }],
                    [3, { name: "TallRocksWest", noExit: 4 }],
                    [4, { name: "BowTie", noExit: 6 }],
                    [4, { name: "HourGlass", noExit: 12 }],
                    [5, { name: "CornerBlocks" }],
                    [2, { name: "Track" }],
                    [4, { name: "CornerHoles" }],
                    [3, { name: "Crypt" }],
                ],
            },
            special: {
                rooms: [
                    {
                        name: "Entrance",
                        icon: 3,
                        tag: "hall_entrance",
                        noExit: 9,
                        door: 1,
                        requirements: (flag) => (flag.storyMode),
                    },
                    {
                        name: "ThreeChests",
                        tag: "hall_hidden_three_chests",
                        noExit: 9,
                        requirements: (flag) => (flag.storyMode),
                    },
                    {
                        name: "Hoodie_Locked",
                        tag: "hoodie_entrance",
                        door: 3,
                        requirements: (flag) => (!flag.hoodie_met_dungeon && (flag.floor_number == 11) && flag.storyMode),
                    },
                    {
                        name: "Hoodie_Unlocked",
                        icon: 13,
                        tag: "hoodie_entrance",
                        requirements: (flag) => (flag.hoodie_met_dungeon && (flag.floor_number == 11) && flag.storyMode),
                    },
                    {
                        name: "Hall_Small_Special_Library",
                        icon: 15,
                        tag: "hall_library",
                        requirements: (flag) => (!flag.whip_enabled && flag.storyMode),
                    },
                    {
                        name: "TributeFountain",
                        icon: 14,
                        tag: "tribute_fountain",
                        requirements: (flag) => (flag.storyMode && !flag.tribute_fountain_encountered && flag.bog_unlocked),
                    },
                ],
            },
            relic: {
                rooms: [
                    [1, { name: "Lanterns" }],
                    [1, { name: "Statues" }],
                    [1, { name: "Pillars" }],
                ],
                shared: {
                    icon: 4,
                    door: 4,
                    requirements: (flag) => (!flag.itemFreedom),
                },
                unlocked: {
                    shared: {
                        door: 0,
                    },
                },
            },
            treasure: {
                rooms: [
                    [2, { name: "SetPiece" }],
                    [3, { name: "ChestSpawner" }],
                    [3, { name: "HalfEast", noExit: 4 }],
                    [3, { name: "HalfWest", noExit: 2 }],
                    [3, { name: "SpikeChest" }],
                    [3, { name: "SpinnerChest" }],
                    [2, { name: "HealthLever" }],
                    [1, { name: "CursedRelics" }],
                    [2, { name: "SpikeSacrifice" }],
                    [2, { name: "OilSpikes" }],
                    [3, { name: "JustAChest" }],
                ],
            },
            secret: {
                rooms: [
                    [5, { name: "Chest02" }],
                    [5, { name: "Skeletons" }],
                    [3, { name: "SpikeSacrifice" }],
                    [1, { name: "Altar" }],
                    [5, { name: "Items" }],
                    [3, { name: "Keys" }],
                    [5, { name: "Chest" }],
                    [3, { name: "Bombs" }],
                    [1, { name: "Blessing" }],
                    [5, { name: "HealthLever" }],
                    [3, { name: "Gold" }],
                    [2, { name: "DualLevers" }],
                    [3, { name: "TorchLighting" }],
                    [10, { name: "DogDillon",
                            requirements: (flag) => (!flag.dog_dillon_found && (flag.delve_count > 7) && !flag.whip_enabled),
                        }],
                    [3, { name: "Talisman",
                            requirements: (flag) => (flag.priestess_met > 2),
                        }],
                    [2, { name: "KeyPillar" }],
                    [1, { name: "BigChest" }],
                    [2, { name: "Nugg" }],
                    [3, { name: "Bard",
                            requirements: (flag) => (!flag.bard_met),
                        }],
                    [3, { name: "TributeFountain", icon: 14,
                            requirements: (flag) => (flag.storyMode && flag.bog_unlocked),
                        }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [3, { name: "Chest" }],
                    [3, { name: "Skeletons", noExit: 1 }],
                    [2, { name: "CursedTorch", noExit: 1 }],
                    [3, { name: "SpikeSacrifice" }],
                    [1, { name: "Altar" }],
                    [1, { name: "CursedPedestal", noExit: 6 }],
                    [3, { name: "ChestBridge", noExit: 11 }],
                    [1, { name: "Lab" }],
                    [2, { name: "PitSpikes",
                            sequence: { tag: "hall_hidden_three_chests", direction: 2 },
                        }],
                    [2, { name: "Bard",
                            requirements: (flag) => (!flag.bard_met),
                        }],
                    [1, { name: "OilBarricade" }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            altar: {
                rooms: [
                    [1, { name: "Torches" }],
                    [1, { name: "Holes" }],
                    [1, { name: "Gargoyles" }],
                ],
                shared: {
                    icon: 5,
                    sequence: { tag: "altar_guacamole" },
                    weightedDoor: [
                        [1, { door: 0 }],
                        [1, { door: 4 }],
                    ],
                    requirements: (flag) => (flag.priestess_met > 2),
                },
                locked: {
                    shared: {
                        weightedDoor: null,
                        door: 4,
                    },
                },
                guacamole: {
                    shared: {
                        weightedDoor: null,
                        sequence: null,
                        requirements: (flag) => (flag.guacamole),
                    },
                },
            }
        },
        large: {
            normal: {
                rooms: [
                    [5, { name: "RandomPillars" }],
                    [5, { name: "DonutHoles" }],
                    [4, { name: "Crossroads" }],
                    [5, { name: "TallRocks" }],
                    [5, { name: "ZigZag" }],
                    [3, { name: "SetPieces" }],
                    [3, { name: "ArrowTraps" }],
                    [5, { name: "Empty" }],
                    [3, { name: "ArrowMaze" }],
                    [2, { name: "BendSW", direction: 5 }],
                    [1, { name: "BendSWPillar", direction: 5 }],
                    [2, { name: "BendSE", direction: 7 }],
                    [1, { name: "BendSEPillar", direction: 7 }],
                    [2, { name: "BendNW", direction: 11 }],
                    [1, { name: "BendNWPillar", direction: 11 }],
                    [1, { name: "BendNEPillar", direction: 14 }],
                    [2, { name: "BendNE", direction: 14 }],
                    [5, { name: "Arena" }],
                    [3, { name: "DeadlyDonut", direction: 12 }],
                    [2, { name: "Knot" }],
                    [2, { name: "DonutSpinner", direction: 6 }],
                    [3, { name: "HazardHeavy" }],
                    [2, { name: "GargoyleHall" }],
                    [2, { name: "EWBridgeThin", direction: 6 }],
                    [3, { name: "EWBridgeThick", direction: 6 }],
                    [3, { name: "SpiderDen" }],
                    [4, { name: "ChessBoard" }],
                    [5, { name: "CrossHole" }],
                    [2, { name: "ArrowFun", direction: 6 }],
                    [5, { name: "CornerPillars" }],
                    [5, { name: "CornerHoles" }],
                    [4, { name: "VerticalHoles" }],
                    [3, { name: "Pillars" }],
                    [4, { name: "SlidingWall" }],
                    [5, { name: "CornerPillars" }],
                    [1, { name: "RandomWall" }],
                    [1, { name: "Gargoyles" }],
                ],
            },
            treasure: {
                rooms: [
                    [3, { name: "CursedRelics", door: 4 }],
                    [3, { name: "BridgeTorches", noExit: 6,
                            sequence: { tag: "secret", direction: 2 } }],
                    [4, { name: "JustSomeTreasure", noExit: 1 }],
                    [4, { name: "GargoylesMaybe" }],
                    [4, { name: "HealthLever" }],
                    [3, { name: "Eggs", noExit: 1 }],
                    [3, { name: "SecretShop", icon: 10, door: 3,
                            requirements: (flag) => (flag.peasant2_unlocked && (flag.dibble_upgrade_count < 4) && flag.storyMode),
                        }],
                    [2, { name: "SpikedRoom", noExit: 1 }],
                    [3, { name: "Cage" }],
                    [2, { name: "Levers", noExit: 8 }],
                    [1, { name: "Choice" }],
                    [1, { name: "Skull" }],
                    [2, { name: "CursedJars", noExit: 3 }],
                    [1, { name: "PilferLever" }],
                ],
            },
            secret: {
                rooms: [
                    [6, { name: "Chest02" }],
                    [6, { name: "Chest" }],
                    [4, { name: "KeyBombMaze" }],
                    [5, { name: "Items" }],
                    [5, { name: "Keys" }],
                    [5, { name: "Bombs" }],
                    [5, { name: "Food" }],
                    [4, { name: "HealthLever" }],
                    [3, { name: "PuzzleLock" }],
                    [2, { name: "BlessingPool" }],
                    [4, { name: "Gold" }],
                    [5, { name: "Altar" }],
                    [1, { name: "SpaceInvader",
                            requirements: (flag) => (flag.foundPartyPopcornPotion && !flag.whip_enabled),
                        }],
                    [3, { name: "SpikeSacrifice" }],
                    [3, { name: "BombPuzzle" }],
                    [4, { name: "Talisman",
                            requirements: (flag) => (flag.priestess_met < 2),
                        }],
                    [2, { name: "KeyPillars" }],
                    [2, { name: "BlackRabbitShop" }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [3, { name: "SpikeJump" }],
                    [2, { name: "TorchPuzzle" }],
                    [2, { name: "Keys" }],
                    [3, { name: "Potions" }],
                    [2, { name: "Crypt" }],
                    [1, { name: "CursedRelics" }],
                    [1, { name: "BlessingChoice" }],
                    [3, { name: "ChessBoard" }],
                    [3, { name: "SpikeSacrifice" }],
                    [2, { name: "SpiderGuantlet" }],
                    [1, { name: "GargoyleGuards" }],
                    [1, { name: "SmallRoom" }],
                    [2, { name: "Gap" }],
                    [1, { name: "DiagonalSpikes" }],
                    [1, { name: "Insulated" }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            special: {
                rooms: [
                    {
                        name: "ShadowlordEntrance",
                        icon: 2,
                        tag: "end_shadow",
                        requirements: (flag) => (flag.storyMode),
                    },
                    {
                        name: "CombatWave",
                        tag: "hall_library_combat_arena",
                        noExit: 12,
                        sequence: { tag: "hall_library", direction: 1 },
                        requirements: (flag) => (!flag.collector_book && !flag.whip_enabled && flag.storyMode)
                    },
                    {
                        name: "RelicAltar",
                        icon: 6,
                        tag: "relic_altar",
                        upgrade: "relicAltar",
                        requirements: (flag) => (!flag.altar_encountered && !flag.whip_enabled),
                    },
                ],
            },
            challange: {
                rooms: [
                    [1, { name: "GamblingRoom", icon: 9 }],
                    [1, { name: "Combat", icon: 11 }],
                ],
            },
        },
    },
    cavern: {
        small: {
            begin: {
                rooms: [
                    [1, { name: "Plain" }],
                    [1, { name: "PillarHole" }],
                    [1, { name: "Pillars" }],
                    [1, { name: "Round" }],
                ],
                shared: {
                    icon: 1,
                    sequence: { tag: "hoodie_entrance", direction: 1,
                        requirements: (flag) => (flag.storyMode),
                    },
                },
            },
            end: {
                rooms: [
                    [1, { name: "End", tag: "end" }],
                    [1, { name: "Boss", icon: 2, tag: "end_boss" }],
                ],
                shared: {
                    icon: 3,
                },
            },
            normal: {
                rooms: [
                    [3, { name: "Empty" }],
                    [3, { name: "Corners" }],
                    [3, { name: "Donut" }],
                    [3, { name: "BowTie", noExit: 6 }],
                    [3, { name: "Razor", noExit: 12 }],
                    [3, { name: "Organic" }],
                    [1, { name: "HallwayEW", noExit: 6 }],
                    [1, { name: "HallwayNS", noExit: 12 }],
                    [2, { name: "NoWest", noExit: 4 }],
                    [2, { name: "NoEast", noExit: 2 }],
                    [2, { name: "NoNorth", noExit: 1 }],
                    [2, { name: "NoSouth", noExit: 3 }],
                    [3, { name: "HoleCorners" }],
                    [3, { name: "CenterHole" }],
                    [2, { name: "VerticalHole" }],
                    [2, { name: "ZPillars" }],
                    [2, { name: "SPillars" }],
                    [2, { name: "UPillar", noExit: 1 }],
                    [2, { name: "VPillar", noExit: 1 }],
                    [2, { name: "UPillarReverse", noExit: 3 }],
                    [2, { name: "VPillarReverse", noExit: 3 }],
                    [2, { name: "WestSlant", noExit: 4 }],
                    [2, { name: "EastSlant", noExit: 2 }],
                    [3, { name: "SpikePatch" }],
                ],
            },
            special: {
                rooms: [
                    {
                        name: "Entrance",
                        icon: 3,
                        tag: "cavern_entrance",
                        noExit: 9,
                        door: 1,
                        requirements: (flag) => (flag.storyMode),
                    },
                    {
                        name: "Hoodie_Locked",
                        tag: "hoodie_entrance",
                        door: 3,
                        requirements: (flag) => (!flag.hoodie_met_cavern && (flag.floor_number == 16) && flag.storyMode),
                    },
                    {
                        name: "Hoodie_Unlocked",
                        icon: 13,
                        tag: "hoodie_entrance",
                        requirements: (flag) => (flag.hoodie_met_cavern && (flag.floor_number == 16) && flag.storyMode),
                    },
                    {
                        name: "HiddenCampsite",
                        tag: "hidden_campsite",
                        door: 2,
                    },
                    {
                        name: "HiddenHallway",
                        tag: "hidden_hallway",
                        noExit: 12,
                    },
                    {
                        name: "TributeFountain",
                        icon: 14,
                        tag: "tribute_fountain",
                        requirements: (flag) => (flag.storyMode && !flag.tribute_fountain_encountered && flag.bog_unlocked),
                    },
                ],
            },
            relic: {
                rooms: [
                    [2, { name: "ocked_Blocks" }],
                    [2, { name: "ocked_Round" }],
                    [2, { name: "Cavern_Small_Relic_Torches" }],
                    [1, { name: "Cavern_Small_Relic_Bridge" }],
                ],
                shared: {
                    icon: 4,
                    door: 4,
                    requirements: (flag) => (!flag.itemFreedom),
                },
                unlocked: {
                    shared: {
                        door: 0,
                    },
                },
            },
            treasure: {
                rooms: [
                    [2, { name: "JustTreasure" }],
                    [2, { name: "Spikes" }],
                    [2, { name: "DoubleRocked" }],
                    [2, { name: "ThiccRocks", noExit: 1 }],
                    [2, { name: "JustTreasureHole" }],
                    [2, { name: "SpikeSacrifice" }],
                    [2, { name: "HealthLever" }],
                    [2, { name: "Diagonal" }],
                    [2, { name: "TorchPuzzle" }],
                    [2, { name: "BombPuzzle" }],
                    [2, { name: "AChillSkeleton" }],
                    [2, { name: "ManySkeletons" }],
                    [1, { name: "CursedRelics" }],
                ],
            },
            secret: {
                rooms: [
                    [3, { name: "Chest" }],
                    [3, { name: "SmallRoomChest", noExit: 9 }],
                    [3, { name: "SpikeSacrifice" }],
                    [1, { name: "Altar" }],
                    [2, { name: "CursedTorch", noExit: 2 }],
                    [3, { name: "SpikedFood" }],
                    [3, { name: "PlainChest" }],
                    [3, { name: "Bombs" }],
                    [2, { name: "KeyPillar" }],
                    [3, { name: "Keys" }],
                    [1, { name: "SWBlessing", noExit: 5 }],
                    [1, { name: "NEBlessing", noExit: 14 }],
                    [1, { name: "NothingHole" }],
                    [2, { name: "SneakyEast", noExit: 10 }],
                    [2, { name: "BlackRabbitShop" }],
                    [3, { name: "GoldNug" }],
                    [3, { name: "Potion" }],
                    [2, { name: "Nugg" }],
                    [3, { name: "Bard",
                            requirements: (flag) => (!flag.bard_met),
                        }],
                    [3, { name: "TributeFountain", icon: 14,
                            requirements: (flag) => (flag.storyMode && flag.bog_unlocked),
                        }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [3, { name: "Chest02" }],
                    [3, { name: "Chest" }],
                    [2, { name: "SpikeSacrifice" }],
                    [3, { name: "ResourceChests" }],
                    [1, { name: "CursedTorches" }],
                    [3, { name: "OvergrownChest" }],
                    [1, { name: "Altar" }],
                    [1, { name: "Lab" }],
                    [1, { name: "Blessing" }],
                    [3, { name: "Food" }],
                    [2, { name: "CostedLever" }],
                    [3, { name: "Bombs" }],
                    [3, { name: "Keyring" }],
                    [1, { name: "CampsiteHall",
                            sequence: { tag: "hidden_hallway", direction: 1 }
                        }],
                    [2, { name: "Bard",
                            requirements: (flag) => (!flag.bard_met),
                        }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            altar: {
                rooms: [
                    [1, { name: "Torches" }],
                    [1, { name: "Holes" }],
                    [1, { name: "Overgrown" }],
                ],
                shared: {
                    icon: 5,
                    sequence: { tag: "altar_guacamole" },
                    weightedDoor: [
                        [1, { door: 0 }],
                        [1, { door: 4 }],
                    ],
                    requirements: (flag) => (flag.priestess_met > 2),
                },
                locked: {
                    shared: {
                        weightedDoor: null,
                        door: 4,
                    },
                },
                guacamole: {
                    shared: {
                        weightedDoor: null,
                        sequence: null,
                        requirements: (flag) => (flag.guacamole),
                    },
                },
            }
        },
        large: {
            normal: {
                rooms: [
                    [4, { name: "Empty" }],
                    [4, { name: "Corners01" }],
                    [4, { name: "Corners02" }],
                    [4, { name: "CenterPillar" }],
                    [5, { name: "Corners03" }],
                    [3, { name: "HallwayEW", noExit: 6 }],
                    [3, { name: "HallwayNS", noExit: 12 }],
                    [4, { name: "CornerColumns" }],
                    [4, { name: "UPillar", noExit: 1 }],
                    [4, { name: "VPillar", noExit: 1 }],
                    [4, { name: "UPillarReverse", noExit: 3 }],
                    [4, { name: "VPillarReverse", noExit: 3 }],
                    [3, { name: "ZPillar" }],
                    [3, { name: "SPillar" }],
                    [3, { name: "TriangleZPillar" }],
                    [4, { name: "CenterHole" }],
                    [4, { name: "VerticalHoles" }],
                    [4, { name: "DiamondHole" }],
                    [4, { name: "FigureEight" }],
                    [3, { name: "WestSlant", noExit: 4 }],
                    [3, { name: "EastSlant", noExit: 2 }],
                    [4, { name: "Razor", noExit: 12 }],
                    [4, { name: "BowTie", noExit: 6 }],
                    [2, { name: "BendNW", noExit: 11 }],
                    [2, { name: "BendNE", noExit: 12 }],
                    [2, { name: "BendSW", noExit: 5 }],
                    [2, { name: "BendSE", noExit: 7 }],
                    [3, { name: "Blocks" }],
                    [4, { name: "PrismStone" }],
                    [3, { name: "RockCage" }],
                    [4, { name: "TwoLargeSetPiece" }],
                    [1, { name: "NightmareScenario" }],
                    [3, { name: "PrismRock" }],
                    [4, { name: "VRock" }],
                    [4, { name: "DoubleRock" }],
                    [4, { name: "Separated" }],
                ],
            },
            treasure: {
                rooms: [
                    [1, { name: "CursedRelics", door: 4 }],
                    [3, { name: "JustTreasure01" }],
                    [3, { name: "BlocksNRocks", noExit: 1 }],
                    [2, { name: "HealthLever" }],
                    [3, { name: "BlockedBridge", noExit: 1 }],
                    [3, { name: "BombPuzzle" }],
                    [2, { name: "LeverBombs", noExit: 1 }],
                    [3, { name: "JustTreasure02", noExit: 7 }],
                    [3, { name: "BurriedStuff" }],
                    [2, { name: "SpikeSacrifice" }],
                    [2, { name: "TorchPuzzle" }],
                    [2, { name: "CaveCells", noExit: 12 }],
                    [3, { name: "SecretShop", icon: 10, door: 3,
                            requirements: (flag) => (flag.peasant2_unlocked && (flag.dibble_upgrade_count < 4) && flag.storyMode),
                        }],
                    [2, { name: "SpikePuzzle" }],
                    [3, { name: "BulletRocks" }],
                    [3, { name: "CoupleItems" }],
                    [2, { name: "WalkWithFire", noExit: 4 }],
                    [1, { name: "Choice" }],
                ],
            },
            secret: {
                rooms: [
                    [3, { name: "Chest" }],
                    [3, { name: "TallRocksChest" }],
                    [3, { name: "Chest" }],
                    [2, { name: "TorchPuzzle" }],
                    [2, { name: "OvergrownStatuePuzzle" }],
                    [2, { name: "3Chests", noExit: 1 }],
                    [1, { name: "Blessing" }],
                    [3, { name: "Keys" }],
                    [2, { name: "KeyBlocks" }],
                    [2, { name: "TiledRoom" }],
                    [2, { name: "SpikeSacrifice" }],
                    [3, { name: "Bombs" }],
                    [2, { name: "BlackRabbitShop" }],
                    [3, { name: "Chest" }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [2, { name: "SpikeJump" }],
                    [3, { name: "BulletChest" }],
                    [2, { name: "Potions" }],
                    [3, { name: "Chests" }],
                    [2, { name: "SpikeSacrifice" }],
                    [1, { name: "Blessing" }],
                    [1, { name: "Altar" }],
                    [1, { name: "DoubleBigChest" }],
                    [3, { name: "Small" }],
                    [2, { name: "Gap" }],
                    [3, { name: "TwoItems" }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            special: {
                rooms: [
                    {
                        name: "PonzuEntrance",
                        icon: 2,
                        tag: "down_crystallord",
                        requirements: (flag) => (flag.storyMode),
                    },
                    {
                        name: "RelicAltar",
                        icon: 6,
                        tag: "relic_altar",
                        upgrade: "relicAltar",
                        requirements: (flag) => (!flag.altar_encountered && !flag.whip_enabled),
                    },
                ],
            },
            challange: {
                rooms: [
                    [1, { name: "GamblingRoom", icon: 9 }],
                    [1, { name: "Combat", icon: 11 }],
                ],
            },
        },
    },
    core: {
        small: {
            begin: {
                rooms: [
                    [1, { name: "Plain" }],
                    [1, { name: "MoltenGold" }],
                    [1, { name: "Pillars" }],
                    [1, { name: "Holes" }],
                    [1, { name: "Blocks" }],
                ],
                shared: {
                    icon: 1,
                    sequence: { tag: "hoodie_entrance", direction: 1,
                        requirements: (flag) => (flag.storyMode),
                    },
                },
            },
            end: {
                rooms: [
                    [1, { name: "End", tag: "end" }],
                    [1, { name: "Boss", icon: 2, tag: "end_boss" }],
                ],
                shared: {
                    icon: 3,
                },
            },
            normal: {
                rooms: [
                    [5, { name: "Empty" }],
                    [4, { name: "Corners" }],
                    [4, { name: "BowTie", noExit: 6 }],
                    [4, { name: "Razor", noExit: 12 }],
                    [4, { name: "Hole" }],
                    [4, { name: "Pillar" }],
                    [4, { name: "HoleNS" }],
                    [4, { name: "Spikes" }],
                    [1, { name: "VerticalHallHazard", noExit: 12 }],
                    [3, { name: "TSectionEast", noExit: 4 }],
                    [3, { name: "TSectionWest", noExit: 2 }],
                    [3, { name: "TSectionNorth", noExit: 3 }],
                    [3, { name: "TSectionSouth", noExit: 1 }],
                    [2, { name: "EastWestSpikes", noExit: 6 }],
                    [3, { name: "DiagonalHole" }],
                    [2, { name: "GoldPuddle" }],
                    [2, { name: "GoldPuddleNS" }],
                    [1, { name: "GoldPuddleCrossRoads" }],
                    [4, { name: "CentralPillar" }],
                    [4, { name: "Diamond" }],
                    [3, { name: "GoldRiver" }],
                    [4, { name: "MovingBlocks" }],
                    [4, { name: "MovingTorches" }],
                    [3, { name: "MovingVents" }],
                    [3, { name: "CornerRocks" }],
                    [5, { name: "Slant" }],
                    [2, { name: "BridgeEW", noExit: 6 }],
                ],
            },
            special: {
                rooms: [
                    {
                        name: "Entrance",
                        icon: 3,
                        tag: "core_entrance",
                        noExit: 9,
                        requirements: (flag) => (flag.storyMode),
                    },
                ],
            },
            relic: {
                rooms: [
                    [1, { name: "Blocks" }],
                    [1, { name: "GoldPool", noExit: 1 }],
                    [1, { name: "Basic" }],
                    [1, { name: "TorchPuzzle" }],
                ],
                shared: {
                    icon: 4,
                    door: 4,
                    requirements: (flag) => (!flag.itemFreedom),
                },
                unlocked: {
                    shared: {
                        door: 0,
                    },
                },
            },
            treasure: {
                rooms: [
                    [4, { name: "JustTreasure" }],
                    [4, { name: "GoldFlow", noExit: 1 }],
                    [3, { name: "WestWall", noExit: 4 }],
                    [3, { name: "EastWall", noExit: 2 }],
                    [3, { name: "NorthWall", noExit: 1 }],
                    [3, { name: "SouthWall", noExit: 3 }],
                    [3, { name: "Spikes" }],
                    [4, { name: "Rocked" }],
                    [3, { name: "SpikeSacrifice" }],
                    [4, { name: "BombPuzzle" }],
                    [1, { name: "CursedRelics" }],
                    [3, { name: "CrossBlock" }],
                    [4, { name: "LongReach", noExit: 4 }],
                    [4, { name: "AlternateLongReach", noExit: 2 }],
                    [3, { name: "GOLD", noExit: 1 }],
                    [3, { name: "TreasureSwitch" }],
                    [3, { name: "DoubleChest" }],
                    [3, { name: "HealthLever" }],
                ],
            },
            secret: {
                rooms: [
                    [4, { name: "Chest" }],
                    [4, { name: "Cookout" }],
                    [2, { name: "SpikeSacrifice" }],
                    [3, { name: "GoldRoom" }],
                    [3, { name: "BombPuzzleSmall" }],
                    [1, { name: "Nuggs" }],
                    [1, { name: "Altar" }],
                    [1, { name: "LockedAltar", noExit: 1 }],
                    [3, { name: "Insulated" }],
                    [2, { name: "Tent" }],
                    [4, { name: "Bombs" }],
                    [4, { name: "Keys" }],
                    [3, { name: "Blessing", noExit: 4 }],
                    [2, { name: "PressurePlate", noExit: 5 }],
                    [2, { name: "GoldRocks" }],
                    [2, { name: "Bard",
                            requirements: (flag) => (!flag.bard_met),
                        }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [4, { name: "Chest" }],
                    [3, { name: "CursedTorch" }],
                    [3, { name: "SpikeSacrifice" }],
                    [4, { name: "Chest02" }],
                    [2, { name: "SecretRoom",
                            sequence: { tag: "secret", direction: 4 },
                        }],
                    [2, { name: "KeyPillar" }],
                    [1, { name: "Altar" }],
                    [3, { name: "Blessing" }],
                    [4, { name: "Item" }],
                    [2, { name: "Lab" }],
                    [3, { name: "SkeletonRocks" }],
                    [4, { name: "CookedFood" }],
                    [2, { name: "Bard",
                            requirements: (flag) => (!flag.bard_met),
                        }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            altar: {
                rooms: [
                    [1, { name: "Torches" }],
                    [1, { name: "Golden" }],
                    [1, { name: "Pillars" }],
                    [1, { name: "Flow", noExit: 2 }],
                    [1, { name: "LongBridge", noExit: 10 }],
                ],
                shared: {
                    icon: 5,
                    sequence: {
                        tag: "altar_guacamole",
                        requirements: (flag) => (flag.guacamole),
                    },
                    weightedDoor: [
                        [1, { door: 0 }],
                        [1, { door: 4 }],
                    ],
                    requirements: (flag) => (flag.priestess_met > 2),
                },
                locked: {
                    shared: {
                        weightedDoor: null,
                        door: 4,
                        sequence: {
                            tag: "altar_guacamole",
                        },
                    },
                },
                guacamole: {
                    shared: {
                        weightedDoor: null,
                        sequence: null,
                        requirements: (flag) => (flag.guacamole),
                    },
                },
            },
        },
        large: {
            normal: {
                rooms: [
                    [4, { name: "Empty" }],
                    [4, { name: "Corners" }],
                    [3, { name: "CentralPillar" }],
                    [3, { name: "CornerHole" }],
                    [2, { name: "NSBridge", noExit: 12 }],
                    [2, { name: "EWSBridge", noExit: 1 }],
                    [2, { name: "EWNBridge", noExit: 3 }],
                    [4, { name: "VerticalHole" }],
                    [3, { name: "ZHole" }],
                    [3, { name: "GoldCorners" }],
                    [3, { name: "NorthLedge", noExit: 1 }],
                    [3, { name: "SouthLedge", noExit: 3 }],
                    [4, { name: "Cross" }],
                    [3, { name: "NECorner", noExit: 14 }],
                    [3, { name: "NWCorner", noExit: 11 }],
                    [3, { name: "SECorner", noExit: 7 }],
                    [3, { name: "SWCorner", noExit: 5 }],
                    [4, { name: "CornerHoles" }],
                    [2, { name: "NSArena", noExit: 12 }],
                    [2, { name: "NSDonut", noExit: 12 }],
                    [2, { name: "SpikeBridgeEW", noExit: 6 }],
                    [3, { name: "NorthGoldPool", noExit: 1 }],
                    [3, { name: "AlternateCross" }],
                    [3, { name: "Quotes" }],
                    [3, { name: "GoldHotdogs" }],
                    [3, { name: "GoldTriangle" }],
                    [3, { name: "GoldRiver" }],
                    [4, { name: "VentSetpeice" }],
                    [3, { name: "Checkboard" }],
                    [3, { name: "SkeletonRockPuddle" }],
                    [2, { name: "RollerBridgeEW", noExit: 6 }],
                    [3, { name: "Snake" }],
                    [4, { name: "SingleSetPiece" }],
                    [2, { name: "DoubleSetPiece" }],
                    [4, { name: "RockTriangles" }],
                    [4, { name: "CentralPillar" }],
                    [4, { name: "StubbyPillars" }],
                    [3, { name: "Ruins" }],
                    [3, { name: "SmallHoles" }],
                    [3, { name: "ArrowMaze" }],
                    [3, { name: "ThornPillars" }],
                    [4, { name: "CornerVents" }],
                    [2, { name: "RollerHall" }],
                    [3, { name: "GoldIsland" }],
                    [3, { name: "CornerHall" }],
                    [4, { name: "CornerPillar" }],
                ],
            },
            treasure: {
                rooms: [
                    [4, { name: "JustTreasure01" }],
                    [4, { name: "BombPuzzle" }],
                    [3, { name: "SpikeSacrifice" }],
                    [3, { name: "Gold" }],
                    [4, { name: "JustTreasure02" }],
                    [2, { name: "River" }],
                    [2, { name: "TorchPuzzle" }],
                    [2, { name: "SecretShop", icon: 10, door: 3,
                            requirements: (flag) => (flag.peasant2_unlocked && (flag.dibble_upgrade_count < 4) && flag.storyMode),
                        }],
                    [3, { name: "BridgeChest", noExit: 2 }],
                    [2, { name: "HealthLever" }],
                    [3, { name: "RollerBridge", noExit: 1 }],
                    [3, { name: "Rollers" }],
                    [1, { name: "CursedRelics" }],
                    [4, { name: "Items" }],
                    [3, { name: "Choice" }],
                    [3, { name: "DoubleSetPiece" }],
                ],
            },
            secret: {
                rooms: [
                    [4, { name: "Chest" }],
                    [2, { name: "BlackRabbitShop" }],
                    [3, { name: "BurriedChests", noExit: 1 }],
                    [1, { name: "Altar" }],
                    [3, { name: "TwoChests" }],
                    [3, { name: "SpikeSacrifice" }],
                    [3, { name: "Blessing" }],
                    [3, { name: "RollerBridge", noExit: 2 }],
                    [4, { name: "RollerBidgeNSItems", noExit: 12 }],
                    [3, { name: "Gold" }],
                    [2, { name: "Talisman" }],
                    [4, { name: "Bombs" }],
                    [3, { name: "KeyBlocks", noExit: 3 }],
                    [4, { name: "Chest02" }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [4, { name: "GoldFlowEast" }],
                    [4, { name: "GoldFlowWest" }],
                    [4, { name: "GoldMoat" }],
                    [3, { name: "RockMaze" }],
                    [3, { name: "GoldLake" }],
                    [2, { name: "TinyRoom" }],
                    [3, { name: "RollerJumps" }],
                    [3, { name: "SmallSpikeSacrifice" }],
                    [3, { name: "RockedIn" }],
                    [2, { name: "Blessing" }],
                    [1, { name: "Altar" }],
                    [3, { name: "TorchPuzzle", sequence: {
                                tag: "secret", chance: 0.5, direction: 2
                            },
                        }],
                    [4, { name: "Food" }],
                    [4, { name: "DoubleChestItem" }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            special: {
                rooms: [
                    {
                        name: "SeerEntrance",
                        icon: 2,
                        tag: "down_firelord",
                        requirements: (flag) => (flag.storyMode),
                    },
                    {
                        name: "RelicAltar",
                        icon: 6,
                        tag: "relic_altar",
                        upgrade: "relicAltar",
                        requirements: (flag) => (!flag.altar_encountered && !flag.whip_enabled),
                    },
                ],
            },
            challange: {
                rooms: [
                    [1, { name: "GamblingRoom", icon: 9 }],
                    [1, { name: "Combat", icon: 11 }],
                ],
            },
        },
    },
    bog: {
        small: {
            begin: {
                rooms: [
                    [2, { name: "Plain" }],
                    [2, { name: "Tiled" }],
                    [2, { name: "Statues" }],
                    [2, { name: "Holes" }],
                    [2, { name: "Ruins" }],
                    [1, { name: "PressurePlate" }],
                ],
                shared: {
                    icon: 1,
                    sequence: { tag: "hoodie_entrance", direction: 1,
                        requirements: (flag) => (flag.storyMode),
                    },
                },
            },
            end: {
                rooms: [
                    [1, { name: "End", tag: "end" }],
                    [1, { name: "Boss", icon: 2, tag: "end_boss" }],
                ],
                shared: {
                    icon: 3,
                },
            },
            normal: {
                rooms: [
                    [3, { name: "Empty" }],
                    [3, { name: "Wet" }],
                    [3, { name: "CornerHoles" }],
                    [3, { name: "VariableCorners" }],
                    [3, { name: "StatuePond" }],
                    [3, { name: "DoubleStatue" }],
                    [3, { name: "Creek" }],
                    [3, { name: "RockCorners" }],
                    [3, { name: "LongHole" }],
                    [3, { name: "OffsetHoles" }],
                    [3, { name: "OffsetTallRocks" }],
                    [3, { name: "Checkered" }],
                    [3, { name: "PileOfRocks" }],
                    [3, { name: "EastHole" }],
                    [3, { name: "WestHole" }],
                    [3, { name: "Creek" }],
                    [3, { name: "CrossHole" }],
                    [3, { name: "Torches" }],
                ],
            },
            special: {
                rooms: [
                    {
                        name: "Entrance",
                        icon: 3,
                        tag: "bog_entrance",
                        door: 1,
                        noExit: 9,
                        requirements: (flag) => (flag.storyMode),
                    },
                ],
            },
            relic: {
                rooms: [
                    [1, { name: "Trees" }],
                    [1, { name: "Ruins" }],
                    [1, { name: "Water" }],
                    [1, { name: "Pillars", noExit: 3 }],
                    [1, { name: "Torches" }],
                    [1, { name: "Bridge", noExit: 10 }],
                ],
                shared: {
                    icon: 4,
                    door: 4,
                    requirements: (flag) => (!flag.itemFreedom),
                },
            },
            relicUnlocked: {
                rooms: [
                    [1, { name: "Trees" }],
                    [1, { name: "Ruins" }],
                    [1, { name: "Water" }],
                    [1, { name: "Bridge", noExit: 10 }],
                    [1, { name: "Torches" }],
                    [1, { name: "Pillars", noExit: 3 }],
                ],
                shared: {
                    icon: 4,
                    door: 4,
                    requirements: (flag) => (!flag.itemFreedom),
                },
            },
            treasure: {
                rooms: [
                    [3, { name: "JustTreasure" }],
                    [3, { name: "JustTreasure02" }],
                    [2, { name: "BlocksRocks", noExit: 1 }],
                    [2, { name: "HoleWest", noExit: 8 }],
                    [2, { name: "HoleEast", noExit: 10 }],
                    [1, { name: "HealthLever" }],
                    [2, { name: "BombPuzzle" }],
                    [3, { name: "PlantPath", noExit: 1 }],
                    [3, { name: "PressurePlate" }],
                    [2, { name: "RockedIn" }],
                    [3, { name: "Cross" }],
                    [2, { name: "SwitchCost", noExit: 6 }],
                    [2, { name: "SwitchCost02" }],
                ],
            },
            secret: {
                rooms: [
                    [4, { name: "Chest" }],
                    [3, { name: "BridgeEast", noExit: 8 }],
                    [3, { name: "BridgeWest", noExit: 10 }],
                    [3, { name: "BombPuzzle", noExit: 1 }],
                    [3, { name: "TorchPuzzle" }],
                    [3, { name: "CornerItem", noExit: 14 }],
                    [3, { name: "Nugg" }],
                    [2, { name: "Bard", noExit: 4,
                            requirements: (flag) => (!flag.bard_met),
                        }],
                    [1, { name: "HealthLever" }],
                    [2, { name: "RuinsChest" }],
                    [1, { name: "Altar" }],
                    [2, { name: "SpikeSacrifice" }],
                    [3, { name: "RockedPotions" }],
                    [2, { name: "Tent" }],
                    [3, { name: "FlowerItem" }],
                    [2, { name: "CursedTorch" }],
                    [4, { name: "BridgeItem" }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [3, { name: "Chest" }],
                    [2, { name: "SpikeSacrifice" }],
                    [1, { name: "DoubleChestLockedIn" }],
                    [2, { name: "Potion" }],
                    [2, { name: "TinyIsland" }],
                    [3, { name: "PondItem" }],
                    [2, { name: "CursedTorch" }],
                    [1, { name: "Altar" }],
                    [3, { name: "BombStash" }],
                    [3, { name: "KeyStash" }],
                    [2, { name: "CursedRelic" }],
                    [2, { name: "LootTree" }],
                    [1, { name: "Blessing" }],
                    [2, { name: "RockedInChests" }],
                    [2, { name: "Bard",
                            requirements: (flag) => (!flag.bard_met),
                        }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            altar: {
                rooms: [
                    [1, { name: "Torches" }],
                    [1, { name: "Woods" }],
                    [1, { name: "Hole" }],
                    [1, { name: "Tiny", noExit: 9 }],
                    [1, { name: "TiledRoom" }],
                    [1, { name: "Water" }],
                ],
                shared: {
                    icon: 5,
                    sequence: {
                        tag: "altar_guacamole",
                        requirements: (flag) => (flag.guacamole),
                    },
                    weightedDoor: [
                        [1, { door: 0 }],
                        [1, { door: 4 }],
                    ],
                    requirements: (flag) => (flag.priestess_met > 2),
                },
            },
            altarLocked: {
                rooms: [
                    [1, { name: "Woods" }],
                    [1, { name: "Torches" }],
                    [1, { name: "Hole" }],
                    [1, { name: "Tiny", noExit: 9 }],
                    [1, { name: "TiledRoom" }],
                    [1, { name: "Water" }],
                ],
                shared: {
                    icon: 5,
                    door: 4,
                    sequence: {
                        tag: "altar_guacamole",
                        requirements: (flag) => (flag.guacamole),
                    },
                    requirements: (flag) => (flag.priestess_met > 2),
                },
            },
            altarGuacamole: {
                rooms: [
                    [1, { name: "Torches" }],
                    [1, { name: "Hole" }],
                    [1, { name: "Woods" }],
                    [1, { name: "Tiny", noExit: 9 }],
                    [1, { name: "TiledRoom" }],
                    [1, { name: "Water" }],
                ],
                shared: {
                    icon: 5,
                    requirements: (flag) => (flag.priestess_met > 2),
                },
            },
        },
        large: {
            normal: {
                rooms: [
                    [3, { name: "Empty" }],
                    [3, { name: "HoleStatue" }],
                    [3, { name: "RockTorch" }],
                    [3, { name: "Tiles" }],
                    [3, { name: "Water" }],
                    [3, { name: "BowTie", noExit: 6 }],
                    [3, { name: "Razor", noExit: 12 }],
                    [3, { name: "VerticalHoles" }],
                    [3, { name: "WindingHole" }],
                    [3, { name: "RockPile" }],
                    [3, { name: "CenterPillars" }],
                    [3, { name: "GrassyPond" }],
                    [3, { name: "CornerNW", noExit: 11 }],
                    [3, { name: "CornerNE", noExit: 14 }],
                    [3, { name: "CornerSW", noExit: 5 }],
                    [3, { name: "CornerSE", noExit: 7 }],
                    [3, { name: "CheckeredHoles" }],
                    [3, { name: "BlocksTiles" }],
                    [3, { name: "Forest" }],
                    [3, { name: "CurveNE", noExit: 4 }],
                    [3, { name: "CurveNW", noExit: 2 }],
                    [3, { name: "CurveSE", noExit: 4 }],
                    [3, { name: "CurveSW", noExit: 2 }],
                    [3, { name: "DeadlyBridge", noExit: 12 }],
                    [3, { name: "WiderBridge", noExit: 12 }],
                    [3, { name: "NorthHole" }],
                    [3, { name: "Bridges" }],
                    [3, { name: "ArrowTrap" }],
                    [3, { name: "ElaborateTrap" }],
                    [3, { name: "NorthEastHole", noExit: 2 }],
                    [3, { name: "SouthWestHole", noExit: 4 }],
                    [3, { name: "Rainbow", noExit: 3 }],
                    [3, { name: "Ruins01" }],
                    [3, { name: "Ruins02" }],
                    [3, { name: "Ruins03" }],
                    [3, { name: "Ruins04" }],
                    [3, { name: "Ruins05a" }],
                    [3, { name: "Ruins05b" }],
                    [3, { name: "Ruins06" }],
                    [3, { name: "HiddenFun" }],
                    [3, { name: "Trees" }],
                    [3, { name: "Plaza" }],
                    [3, { name: "TreeNest" }],
                    [3, { name: "TreeGrid" }],
                    [3, { name: "TreeHole" }],
                    [3, { name: "RockMaze" }],
                ],
            },
            treasure: {
                rooms: [
                    [3, { name: "JustTreasure01" }],
                    [3, { name: "HoleRocks" }],
                    [2, { name: "ArrowTrapHole" }],
                    [3, { name: "DenseForest" }],
                    [2, { name: "ToughJumps" }],
                    [2, { name: "Plates" }],
                    [2, { name: "Plaza" }],
                    [2, { name: "Pond" }],
                    [3, { name: "Spikes" }],
                    [3, { name: "Overgrown", noExit: 4 }],
                    [1, { name: "DangerHallway" }],
                    [2, { name: "FourTorches" }],
                    [2, { name: "BombPuzzle" }],
                    [1, { name: "LotsOfStuff" }],
                    [2, { name: "SpikeSacrifice" }],
                    [3, { name: "HoleSwitch", noExit: 8 }],
                    [3, { name: "JustTreasure02" }],
                    [2, { name: "SpikeCourse", noExit: 12 }],
                    [3, { name: "Bridge", noExit: 10 }],
                    [1, { name: "JustTreasureSmall", noExit: 9 }],
                    [2, { name: "AllOrNothing" }],
                    [2, { name: "SpookyFourTorches" }],
                ],
            },
            secret: {
                rooms: [
                    [3, { name: "Chest" }],
                    [1, { name: "Altar" }],
                    [1, { name: "Camp", noExit: 5 }],
                    [2, { name: "PressureItems" }],
                    [2, { name: "BlackRabbitShop" }],
                    [1, { name: "Blessing" }],
                    [2, { name: "RockedItems" }],
                    [2, { name: "RockedItems02", noExit: 12 }],
                    [3, { name: "Bombs" }],
                    [3, { name: "Food" }],
                    [3, { name: "Keys" }],
                    [2, { name: "PoisonedItems" }],
                    [2, { name: "BlockLever" }],
                    [3, { name: "Diamond" }],
                ],
                shared: {
                    icon: 7,
                    door: 5,
                    reqursion: 1,
                    sequence: { tag: "secret", chance: 0.25,
                        requirements: (flag) => (flag.itemCircinus),
                    },
                },
            },
            hidden: {
                rooms: [
                    [1, { name: "Altar" }],
                    [1, { name: "Blessing" }],
                    [1, { name: "DoubleLockedChest" }],
                    [2, { name: "CookedFood" }],
                    [2, { name: "OopsAllTorches" }],
                    [2, { name: "GoldTree" }],
                    [2, { name: "Series" }],
                    [2, { name: "SpikeSacrifice" }],
                    [3, { name: "SpikeIsland" }],
                ],
                shared: {
                    door: 6,
                    subFloor: 1,
                },
            },
            special: {
                rooms: [
                    {
                        name: "RelicAltar",
                        icon: 6,
                        tag: "relic_altar",
                        upgrade: "relicAltar",
                        requirements: (flag) => (!flag.altar_encountered && !flag.whip_enabled),
                    },
                    {
                        name: "PlunderKingEntrance",
                        icon: 2,
                        tag: "down_pk",
                        requirements: (flag) => (flag.storyMode),
                    },
                    {
                        name: "QueensRoom",
                        tag: "queen_room",
                        icon: 0,
                        requirements: (flag) => (!flag.whip_enabled),
                    },
                    {
                        name: "RoyalRoad_4",
                        tag: "royal_road_4",
                        requirements: (flag) => (!flag.whip_enabled),
                    },
                    {
                        name: "RoyalRoad_2",
                        tag: "royal_road_2",
                        requirements: (flag) => (!flag.whip_enabled),
                    },
                    {
                        name: "RoyalRoad_3",
                        tag: "royal_road_3",
                        requirements: (flag) => (!flag.whip_enabled),
                    },
                    {
                        name: "RoyalRoad_0",
                        tag: "royal_road_0",
                        requirements: (flag) => (!flag.whip_enabled),
                        sequence: [
                            { tag: " royal_road_1", direction: 2 },
                            { tag: " royal_road_2", direction: 1 },
                            { tag: " royal_road_3", direction: 4 },
                            { tag: " royal_road_4", direction: 1 },
                            { tag: " queen_room", direction: 1 },
                        ],
                    },
                    {
                        name: "RoyalRoad_1",
                        tag: "royal_road_1",
                        requirements: (flag) => (!flag.whip_enabled),
                    },
                ],
                shared: {
                    icon: 7,
                },
            },
            challange: {
                rooms: [
                    [1, { name: "GamblingRoom", icon: 9 }],
                    [1, { name: "Combat", icon: 11 }],
                ],
            },
        },
    },
    shop: {
        shop: {
            shop: {
                rooms: [
                    [1, { name: "Encounter_Shop", tag: "pilfer_shop" }],
                    [1, { name: "Encounter_Shop_OM", tag: "pilfer_shop, shop_om" }],
                    [1, { name: "Encounter_Market_Baby", tag: "pilfer_shop, market_baby" }],
                    {
                        weight: 1,
                        name: "Encounter_Market",
                        tag: "pilfer_shop, market",
                        sequence: [
                            { tag: "market_baby" },
                            { tag: "market_baby", direction: 2 },
                        ],
                    },
                    {
                        weight: 1,
                        name: "Encounter_StoreRoom",
                        icon: 0,
                        tag: "shop_storeroom",
                        subFloor: 1,
                        door: 6,
                        requirements: (flag) => (flag.rougeMode)
                    },
                ],
                shared: {
                    icon: 10,
                },
            },
        },
    },
    blackRabbit: {
        blackRabbit: {
            blackRabbit: {
                rooms: [
                    [4, { name: "Encounter_BR_Shop" }],
                    [1, { name: "Encounter_BR_TreasureGame" }],
                    [1, { name: "Encounter_BR_LeverGame", tag: "test" }],
                ],
                shared: {
                    icon: 9,
                    requirements: (flag) => (flag.black_rabbit_met)
                },
            },
        },
    },
};
;
;
const maps = {
    mineTutorial: [
        [
            [
                { roomTypes: ["mineSmall"], tag: "begin_tutorial", weight: 1, direction: 0 },
                { roomTypes: ["mineSmall"], tag: "tutorial_jump", weight: 1, direction: 2 },
                { roomTypes: ["mineSmall"], tag: "tutorial_attack", weight: 1, direction: 2 },
                { roomTypes: ["mineSmall"], tag: "tutorial_bomb", weight: 1, direction: 4 },
                { roomTypes: ["mineLarge"], tag: "tutorial_throw", weight: 1, direction: 1 },
                { roomTypes: ["mineLarge"], tag: "tutorial_pilfer", weight: 1, direction: 4 },
                { roomTypes: ["mineSmall"], tag: "tutorial_relic", weight: 1, direction: 1 },
                { roomTypes: ["mineSmall"], tag: "end_tutorial", weight: 1, direction: 1 }
            ]
        ]
    ],
    mineEarly: [
        [
            [
                { roomTypes: ["mineSmall"], tag: "begin", weight: 1 },
                { roomTypes: ["mineSmall"], tag: "easiest_encounters", weight: 4 },
                { roomTypes: ["mineSmall"], tag: "easiest_encounters", weight: 4 },
                { roomTypes: ["mineSmall"], tag: "easiest_encounters", weight: 4 },
                { roomTypes: ["mineSmall"], tag: "end", weight: 1 }
            ],
            [{ roomTypes: ["mineSmall"], tag: "relic_encounters_unlocked", weight: 1 }],
            [{ roomTypes: ["mineSmall"], tag: "treasure_basic_encounters", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_basic_encounters", chance: 0.5, requirement: "whip" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.5, requirement: "hat" }],
            [{ roomTypes: ["SleepyHoodyRoom"], tag: "" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "hidden" }],
            [{ roomTypes: ["mineLarge"], tag: "relic_altar", chance: 0.0625 }]
        ],
        [
            [
                { roomTypes: ["mineSmall"], tag: "begin", weight: 1 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall"], tag: "end", weight: 1 }
            ],
            [
                { roomTypes: ["mineSmall"], tag: "waylandshophallway" },
                { roomTypes: ["mineSmall"], tag: "waylandshop", direction: 1 }
            ],
            [{ roomTypes: ["mineSmall"], tag: "relic_encounters" }],
            [{ roomTypes: ["mineSmall"], tag: "altar" }],
            [{ roomTypes: ["mineSmall"], tag: "treasure_basic_encounters", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_basic_encounters", chance: 0.5, requirement: "whip" }],
            [{ roomTypes: ["mineLarge"], tag: "shop", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.5, requirement: "hat" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "hidden" }],
            [{ roomTypes: ["mineLarge"], tag: "relic_altar", chance: 0.125 }]
        ],
        [
            [
                { roomTypes: ["mineSmall"], tag: "begin", weight: 1 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
            ],
            [
                { roomTypes: ["mineSmall"], tag: "DodsonCageEncounter,normal_encounters", weight: 4 },
                { roomTypes: ["mineLarge"], tag: "RockMimicEncounter,normal_encounters" },
                { roomTypes: ["mineSmall"], tag: "end", weight: 1 }
            ],
            [{ roomTypes: ["mineSmall"], tag: "relic_encounters" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", chance: 0.5, requirement: "whip" }],
            [{ roomTypes: ["mineLarge"], tag: "shop", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.5, requirement: "hat" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "hidden" }],
            [{ roomTypes: ["mineLarge"], tag: "relic_altar", chance: 0.1875 }]
        ],
        [
            [{ roomTypes: ["mineSmall"], tag: "begin", weight: 1 }],
            [
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall"], tag: "end_worm" }
            ],
            [
                { roomTypes: ["Mine_Dungeon_Room_Large"], tag: "", weight: 1 },
                { roomTypes: ["dungeonSmall"], tag: "dungeon_entrance" }
            ],
            [{ roomTypes: ["mineSmall"], tag: "relic_encounters" }],
            [{ roomTypes: ["mineSmall"], tag: "altar" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", chance: 0.5, requirement: "whip" }],
            [{ roomTypes: ["mineLarge"], tag: "shop", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.5, requirement: "hat" }],
            [{ roomTypes: ["SandRoom"], tag: "hidden" }],
            [{ roomTypes: ["dungeonSmall", "dungeonLarge"], tag: "hidden" }],
            [{ roomTypes: ["mineLarge"], tag: "relic_altar", chance: 0.25 }]
        ],
    ],
    mine: [
        [
            [
                { roomTypes: ["mineSmall"], tag: "begin", weight: 1 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall"], tag: "end", weight: 1 }
            ],
            [{ roomTypes: ["mineSmall"], tag: "relic_encounters_unlocked", weight: 1 }],
            [{ roomTypes: ["mineSmall"], tag: "black_rabbit_first", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", chance: 0.5, requirement: "whip" }],
            [{ roomTypes: ["mineSmall"], tag: "altar", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.5, requirement: "hat" }],
            [{ roomTypes: ["SleepyHoodyRoom"], tag: "hoody" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "hidden" }],
            [{ roomTypes: ["mineLarge"], tag: "relic_altar", chance: 0.0625 }],
            [{ roomTypes: ["mineSmall"], tag: "tribute_fountain", chance: 0.0625 }]
        ],
        [
            [
                { roomTypes: ["mineSmall"], tag: "begin", weight: 1 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall"], tag: "end", weight: 1 }
            ],
            [
                { roomTypes: ["mineSmall"], tag: "waylandshophallway" },
                { roomTypes: ["mineSmall"], tag: "waylandshop" }
            ],
            [{ roomTypes: ["mineSmall"], tag: "relic_encounters" }],
            [{ roomTypes: ["mineLarge"], tag: "mushroom_apprentice", weight: 1, chance: 0.5 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "mushroom", weight: 1, chance: 0.6 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", chance: 0.5, requirement: "whip" }],
            [{ roomTypes: ["mineLarge"], tag: "shop", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.5, requirement: "hat" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "hidden" }],
            [{ roomTypes: ["mineLarge"], tag: "relic_altar", chance: 0.125 }],
            [{ roomTypes: ["mineSmall"], tag: "tribute_fountain", chance: 0.125 }]
        ],
        [
            [
                { roomTypes: ["mineSmall"], tag: "begin", weight: 1 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineLarge"], tag: "normal_encounters", weight: 4 },
            ],
            [
                { roomTypes: ["mineSmall"], tag: "DodsonCageEncounter,normal_encounters", weight: 4 },
                { roomTypes: ["mineLarge"], tag: "RockMimicEncounter,normal_encounters" },
                { roomTypes: ["mineSmall"], tag: "end", weight: 1 }
            ],
            [{ roomTypes: ["mineSmall"], tag: "relic_encounters" }],
            [{ roomTypes: ["mineLarge"], tag: "mushroom_apprentice", weight: 1, chance: 0.7 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "mushroom", weight: 1, chance: 0.7 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", chance: 0.5, requirement: "whip" }],
            [{ roomTypes: ["mineLarge"], tag: "shop", weight: 1 }],
            [{ roomTypes: ["mineSmall"], tag: "altar", weight: 1 }],
            [{ roomTypes: ["mineLarge"], tag: "black_rabbit", chance: 0.5 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.5, requirement: "hat" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "hidden" }],
            [{ roomTypes: ["mineLarge"], tag: "relic_altar", chance: 0.1875 }],
            [{ roomTypes: ["mineSmall"], tag: "tribute_fountain", chance: 0.1875 }]
        ],
        [
            [{ roomTypes: ["mineSmall"], tag: "begin", weight: 1 }],
            [
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall", "mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineLarge"], tag: "normal_encounters", weight: 4 },
                { roomTypes: ["mineSmall"], tag: "end_worm" }
            ],
            [
                { roomTypes: ["Mine_Dungeon_Room_Large"], tag: "", weight: 1 },
                { roomTypes: ["dungeonSmall"], tag: "dungeon_entrance" }
            ],
            [{ roomTypes: ["mineSmall"], tag: "relic_encounters" }],
            [{ roomTypes: ["mineLarge"], tag: "mushroom_apprentice", weight: 1, chance: 0.9 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "mushroom", weight: 1, chance: 0.8 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "treasure_encounters", chance: 0.5, requirement: "whip" }],
            [{ roomTypes: ["mineLarge"], tag: "shop", weight: 1 }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret" }],
            [{ roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.5, requirement: "hat" }],
            [{ roomTypes: ["SandRoom"], tag: "hidden" }],
            [{ roomTypes: ["dungeonSmall", "dungeonLarge"], tag: "hidden" }],
            [{ roomTypes: ["mineLarge"], tag: "relic_altar", chance: 0.25 }],
            [{ roomTypes: ["mineSmall"], tag: "tribute_fountain", chance: 0.25 }]
        ]
    ]
};
function getRooms(zone, floor, seed, seenRooms = []) {
    seed = (seed ?? parseInt(e$("seed-input").value)) + floor;
    let count = 0;
    let previousRoom = null;
    const zeroPad = (num, places) => String(num).padStart(places, "0");
    function requirements(check) {
        if (check == undefined) {
            return true;
        }
        const s$ = settings.flags;
        switch (check) {
            case "noRelicHex":
                return !s$.relicHex;
            case "dogShadowNotFound":
                return !s$.dog_shadow_found && (s$.delve_count > 5);
            case "thisRunBardNotMet":
                return !s$.bard_met;
            case "bogUnlocked":
                return !!s$.bog_unlocked;
            case "noTreasureNote":
                return !s$.secret_treasure_note;
            case "noRatBond":
                return !s$.foundRatBond;
            case "priestessMet":
                return s$.priestess_met > 2;
            case "guacamole":
                return !!s$.haveGuacamole;
            case "dodsonNotRescued":
                return !s$.peasant1_unlocked;
            case "waylandNotRescued":
                return !s$.blacksmith_rescued && !s$.foundWaylandsBoots;
            case "noGreenShroom":
                return !s$.mushroom_green && !!s$.apprentice_met;
            case "noBlueShroom":
                return !s$.mushroom_blue && !!s$.apprentice_met;
            case "blackRabbitNotMet":
                return !s$.black_rabbit_met;
            case "hoodieNotMet":
                return (floor === 1) && !!s$.rockmimic_defeated && !s$.hoodie_met_mine;
            case "hoodieMet":
                return (floor === 1) && !!s$.rockmimic_defeated && !!s$.hoodie_met_mine;
            case "thisRunFountainNotFound":
                return !!s$.bog_unlocked && !s$.tribute_fountain_encountered;
            case "blackRabbitMet":
                return !!s$.black_rabbit_met;
            case "devleCount8+":
                return s$.delve_count > 8;
            case "dibbleNotComplete":
                return !!s$.peasant2_unlocked && (s$.dibble_upgrade_count < 4);
            case "noDodsonKey":
                return !s$.prisoner_key;
            case "noPurpleShroom":
                return !s$.mushroom_purple && !!s$.apprentice_met;
            case "apprenticeNotMet":
                return !s$.apprentice_met && !!s$.blacksmith_rescued;
            case "haveAllShrooms":
                return s$.apprentice_met === 4;
            case "whip":
                return !!s$.haveWhip;
            case "hat":
                return !!s$.haveHat;
            case "circinus":
                return !!s$.haveCircinus;
            case "thisRunAltarNotFound":
                return !s$.altar_encountered;
            default:
                return false;
        }
    }
    function getRoom(room) {
        let value = null;
        if ((room.chance ?? 1) < 1 && (room.chance < (value = rand.layout.value))) {
            return false;
        }
        if (!requirements(room.requirement)) {
            return false;
        }
        if (room.tag == "secret") {
        }
        const type = room.roomTypes[rand.layout.range(0, room.roomTypes.length)];
        const tags = room.tag.split(",");
        let roomOut = null;
        let foundRoom = null;
        for (const tag of tags) {
            const encounterGroup = mineEncounterGroups[type][tag];
            if (encounterGroup) {
                const filteredRooms = encounterGroup.filter(current => !seenRooms.includes(current) && requirements(current.requirement));
                if (filteredRooms.length) {
                    foundRoom = rand.layout.getWeightedTable(filteredRooms);
                    roomOut = { roomName: foundRoom.roomName, sequence: foundRoom.sequence, weight: (room.weight ?? 0) };
                    if (foundRoom.weightedDoorTypes) {
                        roomOut.doorType = rand.layout.getWeightedTable(foundRoom.weightedDoorTypes).doorType;
                    }
                    break;
                }
                else {
                    roomOut = false;
                }
            }
            else {
                foundRoom = mineEncounterGroups[type].direct.find(encounter => (encounter.roomTag === tag) && requirements(encounter.requirement)) ?? false;
                if (foundRoom) {
                    roomOut = { roomName: foundRoom.roomName, sequence: foundRoom.sequence, weight: (room.weight ?? 0) };
                    if (foundRoom.weightedDoorTypes) {
                        roomOut.doorType = rand.layout.getWeightedTable(foundRoom.weightedDoorTypes).doorType;
                    }
                    roomOut.direction = room.direction;
                    break;
                }
                else {
                    roomOut = false;
                }
            }
        }
        if (previousRoom && roomOut) {
            roomOut.previousRoom = previousRoom;
        }
        previousRoom = roomOut;
        return roomOut;
    }
    for (const roomGroup of zone[floor - 1]) {
        previousRoom = null;
        for (const room of roomGroup) {
            const currentRoom = getRoom(room);
            if (currentRoom === false) {
                break;
            }
            if (currentRoom) {
                seenRooms.push(currentRoom);
                if (currentRoom.doorType) {
                }
                else {
                }
                if (currentRoom.sequence) {
                    const nextRoom = getRoom(currentRoom.sequence);
                    if (nextRoom) {
                        seenRooms.push(nextRoom);
                        previousRoom = currentRoom;
                        if (nextRoom.doorType) {
                        }
                        else {
                        }
                    }
                }
            }
        }
    }
    return seenRooms;
}
function mapMaker(roomList) {
    const none = 0b0000;
    const north = 0b0001;
    const south = 0b0010;
    const east = 0b0100;
    const west = 0b1000;
    const cardinalDirections = [north, south, east, west];
    const opposite = (direction) => (direction & (north + east)) ? direction << 1 : direction >>> 1;
    const startingRoom = roomList[0];
    let positionedRooms = [];
    for (let trial = 0; trial < 10; ++trial) {
        roomList.forEach(room => {
            room.neighbours = [];
            room.position = { x: 0, y: 0 };
            room.binMap = none;
        });
        positionedRooms = [startingRoom];
        roomList.slice(1).forEach(room => {
            if (setRoomPosition(room)) {
                positionedRooms.push(room);
            }
        });
        if (positionedRooms.length === roomList.length) {
            positionedRooms = movePosOrigo(positionedRooms);
            console.table(getNeigbours(positionedRooms));
            const outArray = positionedRooms.map(room => [room.roomName, room.position.x, room.position.y, room.binMap]);
            return outArray;
        }
        else {
            console.log(`%cLayout failed, trying again!`, "color:#a00;");
        }
    }
    function setRoomPosition(room) {
        let direction = room.direction ?? none;
        if (room.previousRoom) {
            room.position = room.previousRoom.position;
            if (direction) {
                if (canMove(room, direction)) {
                    room.position = newPosition(room.position, direction);
                }
                else {
                    direction = none;
                }
            }
            else {
                for (const newDirection of rand.layout.shuffle(cardinalDirections)) {
                    if (canMove(room, newDirection)) {
                        direction = newDirection;
                        room.position = newPosition(room.position, direction);
                        break;
                    }
                }
            }
        }
        else if (room.doorType === "none" || room.doorType === "hidden") {
            for (const startRoom of rand.layout.shuffle(positionedRooms)) {
                room.position = startRoom.position;
                for (const newDirection of rand.layout.shuffle(cardinalDirections)) {
                    if (canMove(room, newDirection)) {
                        direction = newDirection;
                        room.position = newPosition(room.position, direction);
                        break;
                    }
                }
                if (direction) {
                    break;
                }
            }
        }
        else {
            let weightedRooms = positionedRooms.filter(room => room.weight);
            while (!direction && weightedRooms.length > 0) {
                let startRoom = null;
                if (startRoom = rand.layout.getWeightedTable(weightedRooms)) {
                    room.position = startRoom.position;
                    for (const newDirection of rand.layout.shuffle(cardinalDirections)) {
                        if (isValidNeighbor(startRoom, room, newDirection) && canMove(room, newDirection)) {
                            direction = newDirection;
                            room.position = newPosition(room.position, direction);
                            break;
                        }
                    }
                    weightedRooms = weightedRooms.filter(current => current != startRoom);
                }
            }
        }
        if (direction) {
            if (room.doorType != "none" && room.doorType != "hidden") {
                let opposingDirection = opposite(direction);
                let opposingRoom = getRoomInPos(newPosition(room.position, opposingDirection));
                if (opposingRoom != null) {
                    opposingRoom.neighbours[direction] = room;
                    room.neighbours[opposingDirection] = opposingRoom;
                }
            }
            return true;
        }
        return false;
        function canMove(room, direction) {
            if (room.previousRoom && !isValidNeighbor(room, room.previousRoom, direction))
                return false;
            else if (!getRoomInPos(newPosition(room.position, direction)))
                return true;
            else
                return false;
        }
        function getRoomInPos(pos) {
            return roomList.find(room => (room.position.x === pos.x && room.position.y === pos.y));
        }
        function isValidNeighbor(room, neighbor, direction) {
            return !(direction) ? allowNeighbor(room, neighbor) : validDirection(room, neighbor, direction);
            function allowNeighbor(room, neighbor) {
                const checkLink = (direction) => validDirection(room, neighbor, direction);
                return checkLink(north) || checkLink(south) || checkLink(east) || checkLink(west);
            }
            function validDirection(room, neighbor, direction) {
                return !(room.prohibitedExits & direction) && !(neighbor.prohibitedExits & opposite(direction));
            }
        }
        function newPosition(position, direction) {
            const [xPos, yPos] = [position.x, position.y];
            switch (direction) {
                case north: return { x: xPos, y: yPos - 1 };
                case south: return { x: xPos, y: yPos + 1 };
                case east: return { x: xPos + 1, y: yPos };
                case west: return { x: xPos - 1, y: yPos };
                default: return { x: xPos, y: yPos };
            }
        }
    }
    function movePosOrigo(rooms) {
        const xMin = rooms.reduce((min, current) => min = Math.min(min, current.position.x), 0);
        const yMin = rooms.reduce((min, current) => min = Math.min(min, current.position.y), 0);
        rooms.forEach(room => room.position = { x: (room.position.x - xMin), y: (room.position.y - yMin) });
        return rooms;
    }
    function getNeigbours(rooms) {
        let binaryMap = Array.from(Array(10), () => new Array());
        for (const room of rooms) {
            const [xPos, yPos] = [room.position.x, room.position.y];
            if (yPos && !(room.binMap & north) && (binaryMap[yPos - 1][xPos]))
                room.binMap += north;
            if (!(room.binMap & south) && (binaryMap[yPos + 1][xPos]))
                room.binMap += south;
            if (!(room.binMap & east) && (binaryMap[yPos][xPos + 1]))
                room.binMap += east;
            if (xPos && !(room.binMap & west) && (binaryMap[yPos][xPos - 1]))
                room.binMap += west;
        }
        return binaryMap;
    }
}
function listCraftable(table) {
    const selection = document.getElementById(`${table}-selection`);
    selection.innerHTML = `<legend>Crafted ${table}s</legend>`;
    masterTable[table].forEach((item, index) => {
        if (item.crafting != 0) {
            const itemCheckbox = document.createElement("input");
            itemCheckbox.type = "checkbox";
            itemCheckbox.value = String(index);
            const itemLable = document.createElement("label");
            itemLable.appendChild(itemCheckbox);
            itemLable.innerHTML += item.display;
            selection.appendChild(itemLable);
        }
    });
}
function checkAll(boxCollaction, toggle) {
    for (const box of boxCollaction) {
        box.checked = toggle;
    }
}
function populateAltar() {
    const relics = [];
    const altarSelection = document.getElementById("altar");
    masterTable.relic.forEach((relic, index) => {
        relics.push([relic.display, index]);
    });
    relics.pop();
    relics.sort();
    for (const [display, index] of relics) {
        const selection = document.createElement("option");
        selection.value = index;
        selection.text = display;
        altarSelection.add(selection);
    }
    altarSelection.value = "";
}
function loadLootTables() {
    Object.values(masterTable).forEach((subTable) => {
        subTable.forEach((item, mIndex) => {
            Object.entries(item.tables).forEach(([key, table]) => {
                const tableB = table;
                lootTables[key][tableB.index] = { weight: tableB.weight, masterIndex: mIndex };
            });
        });
    });
}
function nextItem(table = "relic", randState = "relic") {
    table = lootTables[table];
    const itemID = rand[randState].getWeightedElement(table);
    return { relic: masterTable.relic[itemID], masterIndex: itemID };
}
function toggleWeight(indices = 157, subTable = "relic", isZero = true) {
    if (!Array.isArray(indices)) {
        indices = [indices];
    }
    indices.forEach((index) => {
        Object.entries(masterTable[subTable][index].tables).forEach(([key, table]) => {
            const tableB = table;
            lootTables[key][tableB.index].weight = (tableB.weight * !isZero);
        });
    });
}
function toggleOthermine(on = false) {
    toggleWeight([133, 134, 157], "relic", !on);
}
function toggleUncheckedItems() {
    const CBRelic = Object.values(e$("relic-selection").getElementsByTagName("input"));
    const CBPotion = Object.values(e$("potion-selection").getElementsByTagName("input"));
    toggleWeight(CBRelic.flatMap(box => !(box.checked) ? parseInt(box.value) : []), "relic");
    toggleWeight(CBPotion.flatMap(box => !(box.checked) ? parseInt(box.value) : []), "potion");
}
function dibble(seed) {
    const wTables = [], items = [];
    const totalItems = 2 + settings.flags.dibble_extra_item;
    if (settings.flags.dibble_relic) {
        wTables.push(rand.shop.getWeightedTable(lootTables.dibbleRelic));
    }
    for (let i = settings.flags.dibble_relic; i < totalItems; ++i) {
        wTables.push(rand.shop.getWeightedTable(lootTables.dibble));
    }
    wTables.forEach((subtable) => {
        const table = masterTable.weightedTables[subtable.masterIndex];
        const index = rand[table.randState].loot(lootTables[table.key]);
        items.push({ display: masterTable[table.type][index].display, type: table.type });
        if (table.type === "relic") {
            toggleWeight(index, "relic");
        }
    });
    const field = e$c("fieldset", { id: "hub", classList: "zone" });
    const legend = e$c("legend", { textContent: "Hub" });
    field.appendChild(legend);
    e$("levels").appendChild(field);
    const subfield = e$c("fieldset", { id: "dibble", classList: "level" });
    const sublegend = e$c("legend", { textContent: "Dibble" });
    subfield.appendChild(sublegend);
    e$("hub").appendChild(subfield);
    items.forEach((item, i) => {
        e$("dibble").appendChild(e$c("div", { classList: `icon-${item.type}`, innerText: item.display }));
    });
}
function shop(zone, level) {
    const shopName = `shop-${zone}-${level}`;
    const totalPoR = settings.flags.shop_potion_relic;
    const totalFood = settings.flags.shop_food;
    const totalBasic = settings.flags.shop_basic_item;
    const totalItems = totalPoR + totalFood + totalBasic;
    const wTable = [], table = [], index = [], item = [], html = [];
    let shopRoom = document.createElement("div");
    shopRoom.id = shopName;
    shopRoom.classList.add("icon-shop");
    e$(zone + level).appendChild(shopRoom);
    for (let i = 0; i < totalPoR; ++i) {
        wTable.push(rand.shop.getWeightedTable(lootTables.potionOrRelic));
        table.push(masterTable.weightedTables[wTable[i].masterIndex]);
        index.push(rand[table[i].randState].loot(lootTables[table[i].key]));
        if (table[i].type === "relic") {
            toggleWeight(index[i]);
        }
    }
    for (let i = 0; i < totalFood; ++i) {
        table.push({ key: "food", type: "food", randState: "shopHealth" });
    }
    for (let i = 0; i < totalBasic; ++i) {
        table.push({ key: "item", type: "item", randState: "shopBasicItem" });
    }
    for (let i = totalPoR; i < totalItems; ++i) {
        index.push(rand[table[i].randState].loot(lootTables[table[i].key]));
    }
    index.forEach((index, i) => {
        item.push(masterTable[table[i].type][index]);
    });
    table.forEach((table, i) => {
        html.push(document.createElement("div"));
        html[i].classList.add(`icon-${table.type}`);
        html[i].innerHTML = item[i].display;
        e$(shopName).appendChild(html[i]);
    });
}
function randomSeed() {
    e$("seed-input").value = seedRand.rangeInclusive(1, 99999999);
    loadSeed();
}
function nextRand(seed) {
    Object.keys(rand).forEach((key) => {
        rand[key] = new Random(seed);
    });
}
let loadSeed = () => {
    start(parseInt((e$("seed-input").value)));
};
function start(seed) {
    e$("levels").innerHTML = "";
    loadLootTables();
    nextRand(seed);
    toggleUncheckedItems();
    let currentRelics;
    let relicText;
    toggleWeight(3, "food");
    toggleWeight(66, "potion");
    toggleWeight(133);
    toggleWeight(134);
    toggleWeight(157);
    dibble(seed);
    if (e$("altar").value) {
        toggleWeight(e$("altar").value);
    }
    nextZone("mine", 0, "The Goldmines", seed);
    nextZone("dungeon", 1, "Delvemore Dungeon", seed);
    nextZone("halls", 2, "Halls of Din", seed);
    nextZone("caverns", 3, "The Shimmering Caverns", seed);
    nextZone("core", 4, "Golden Core", seed);
    function nextZone(zone, zoneID, title, seed) {
        seed += zoneID * 5;
        let field = document.createElement("fieldset");
        field.id = zone;
        field.classList.add("zone");
        let legend = document.createElement("legend");
        legend.textContent = title;
        field.appendChild(legend);
        e$("levels").appendChild(field);
        for (let i = 1; i <= 4; ++i) {
            nextRand(seed + i);
            let subfield = document.createElement("fieldset");
            subfield.id = zone + i;
            subfield.classList.add("level");
            let sublegend = document.createElement("legend");
            sublegend.textContent = "Level " + i;
            subfield.appendChild(sublegend);
            e$(zone).appendChild(subfield);
            let relicRoom = document.createElement("div");
            relicRoom.id = "relic" + zone + i;
            relicRoom.classList.add("icon-relicOn");
            e$(zone + i).appendChild(relicRoom);
            let relic;
            if (((zoneID + i) === 1) && e$("new-save-radio").checked) {
                toggleWeight(146, "relic");
                relic = nextItem("relicStarter");
            }
            else {
                relic = nextItem("relic");
            }
            toggleWeight(relic.masterIndex);
            relicText = document.createElement("div");
            relicText.classList.add("icon-relic");
            relicText.innerHTML = relic.relic.display;
            e$("relic" + zone + i).appendChild(relicText);
            if ((zoneID + i) > 1) {
                shop(zone, i);
            }
        }
    }
}
const saveSelection = e$("save-radio-selecion");
const newRadio = e$("new-save-radio");
const fullRadio = e$("100-save-radio");
const loadRadio = e$("own-save-radio");
const loadInput = e$("save-file-input");
const randomSeedButton = e$("random-seed-button");
const loadSeedButton = e$("load-seed-button");
listCraftable("relic");
listCraftable("potion");
populateAltar();
loadLootTables();
randomSeed();
const radioEvent = new Event("change");
e$("menu-options").addEventListener("change", () => loadSeed());
e$("save-radio-selecion").addEventListener("change", (event) => {
    if (loadRadio.checked) {
        if (loadInput.files[0]) {
            let file = loadInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                settings = loadSave(loadRadio, e.target.result);
                applySettings(settings);
                loadSeed();
            };
            reader.readAsText(file);
        }
        else {
            loadInput.click();
        }
    }
    else if (fullRadio.checked) {
        settings = loadSave(fullRadio);
        applySettings(settings);
        loadSeed();
    }
    else {
        settings = loadSave(newRadio);
        applySettings(settings);
        loadSeed();
    }
});
loadInput.addEventListener("change", () => {
    loadRadio.checked = true;
    e$("save-radio-selecion").dispatchEvent(radioEvent);
});
randomSeedButton.addEventListener("click", randomSeed);
loadSeedButton.addEventListener("click", loadSeed);
fullRadio.checked = true;
e$("save-radio-selecion").dispatchEvent(radioEvent);
