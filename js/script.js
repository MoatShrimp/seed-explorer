"use strict";
function e$(name, parent = document) {
    switch (name.charAt(0)) {
        case '.':
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
    constructor(firstSeed = 51113926) {
        firstSeed = toUInt32(firstSeed);
        const nextSeed = (seed) => toUInt32(1289 * toUInt32(1406077 * seed) + 1);
        const secondSeed = nextSeed(firstSeed), thirdSeed = nextSeed(secondSeed);
        this.seed = [
            firstSeed,
            secondSeed,
            thirdSeed,
            nextSeed(thirdSeed)
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
        return (max - min) * (toUInt32(this.nextUInt << 9) / 0xFFFFFFFF) + min;
    }
    rangeInclusive(min, max) {
        return this.range(min, max + 1);
    }
    getWeightedElement(table) {
        let output = 0;
        let totalWeight = table.reduce((totalWeight, currentItem) => totalWeight + currentItem.weight, 0);
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
        let totalWeight = table.reduce((totalWeight, currentItem) => totalWeight + currentItem.weight, 0);
        let randWeight = this.rangeInclusive(1, totalWeight);
        return table.find((currentItem) => ((randWeight -= currentItem.weight) <= 0));
    }
}
function loadSave(radio, file) {
    const settingsOut = {
        checkboxes: {
            relic: null,
            potion: null
        },
        "altarRelic": -1,
        flags: {
            "shop_basic_item": 1,
            "shop_food": 1,
            "shop_potion_relic": 1,
            "dibble_extra_item": 0,
            "dibble_relic": 0
        }
    };
    const CBRelic = Object.values(e$("relic-selection").getElementsByTagName("input"));
    const CBPotion = Object.values(e$("potion-selection").getElementsByTagName("input"));
    switch (radio.value) {
        case "0":
            break;
        case '100':
            settingsOut.checkboxes.relic = CBRelic;
            settingsOut.checkboxes.potion = CBPotion;
            settingsOut.altarRelic = 149;
            settingsOut.flags['shop_basic_item'] = 2;
            settingsOut.flags['shop_food'] = 3;
            settingsOut.flags['shop_potion_relic'] = 3;
            settingsOut.flags['dibble_extra_item'] = 1;
            settingsOut.flags['dibble_relic'] = 1;
            break;
        case 'own':
            const saveData = JSON.parse(file);
            settingsOut.checkboxes.relic = saveData.unlocked.flatMap(craftedGUID => CBRelic.find(box => parseInt(box.value) === masterTable.relic.findIndex(relic => relic.guid === craftedGUID)) ?? []);
            settingsOut.checkboxes.potion = saveData.unlocked.flatMap(craftedGUID => CBPotion.find(box => parseInt(box.value) === masterTable.potion.findIndex(potion => potion.guid === craftedGUID)) ?? []);
            settingsOut.altarRelic = masterTable.relic.findIndex(relic => relic.guid === saveData.altarItemID);
            saveData.upgradeString.split(',').forEach(item => {
                const [key, value] = item.split(':');
                settingsOut.flags[key] = parseInt(value);
            });
            break;
    }
    return settingsOut;
}
function applySettings(settings) {
    checkAll(e$('relic-selection').getElementsByTagName('input'), false);
    if (settings.checkboxes.relic) {
        checkAll(settings.checkboxes.relic, true);
    }
    checkAll(e$('potion-selection').getElementsByTagName('input'), false);
    if (settings.checkboxes.potion) {
        checkAll(settings.checkboxes.potion, true);
    }
    e$('altar').value = settings.altarRelic;
}
const masterTable = Object.freeze({
    "relic": [
        {
            "guid": "1981b4af04434077afafc78691056387",
            "name": "WaylandsBoots",
            "display": "Wayland's Boots",
            "details": "Break spikes",
            "rarity": "Common",
            "crafting": 8,
            "cost": 375,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 5,
                    "weight": 9
                },
                "relicAll": {
                    "index": 3,
                    "weight": 9
                }
            }
        },
        {
            "guid": "25a2fe2d57a34b6598d34cbbb58fdeb0",
            "name": "Galoshes",
            "display": "Galoshes",
            "details": "Walk and jump on oil and poison",
            "rarity": "Common",
            "crafting": "-",
            "cost": 275,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 6,
                    "weight": 9
                },
                "relicAll": {
                    "index": 56,
                    "weight": 9
                },
                "relicShop": {
                    "index": 31,
                    "weight": 9
                }
            }
        },
        {
            "guid": "d2b0fec2b4cf44e8aa63b0aa94441fd5",
            "name": "FloatBoots",
            "display": "Float Boots",
            "details": "Walk on air",
            "rarity": "Common",
            "crafting": "-",
            "cost": 450,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 41,
                    "weight": 9
                },
                "relicAll": {
                    "index": 54,
                    "weight": 9
                },
                "relicShop": {
                    "index": 15,
                    "weight": 9
                }
            }
        },
        {
            "guid": "7ee59f418896447ca03ce09665771ae6",
            "name": "LavaWalkers",
            "display": "Lava Walkers",
            "details": "Walk on fire",
            "rarity": "Common",
            "crafting": 26,
            "cost": 275,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 50,
                    "weight": 9
                },
                "relicAll": {
                    "index": 103,
                    "weight": 9
                },
                "relicShop": {
                    "index": 18,
                    "weight": 3
                }
            }
        },
        {
            "guid": "a7ae4ce21346402ca6fe2ad0c09b1c14",
            "name": "HeliosBoots",
            "display": "Helios Boots",
            "details": "Oil + Fire",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 550,
            "extra": "Combined from Galoshes & Lava Walkers",
            "tables": {}
        },
        {
            "guid": "23f1ec241ee449419dfcf3db6ede4f8a",
            "name": "HeavyBoots",
            "display": "Heavy Boots",
            "details": "Jump again in midair",
            "rarity": "Common",
            "crafting": 22,
            "cost": 275,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 110,
                    "weight": 9
                },
                "relicAll": {
                    "index": 121,
                    "weight": 9
                },
                "relicShop": {
                    "index": 51,
                    "weight": 9
                }
            }
        },
        {
            "guid": "fe3880cccffb46a6ba510453822df02b",
            "name": "ButchersCleaver",
            "display": "Butcher's Cleaver",
            "details": "Sometimes drop meat from your enemies",
            "rarity": "Common",
            "crafting": "-",
            "cost": 525,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 48,
                    "weight": 9
                },
                "relicAll": {
                    "index": 28,
                    "weight": 9
                },
                "relicStarter": {
                    "index": 1,
                    "weight": 9
                }
            }
        },
        {
            "guid": "637c8bf20a8d4e6da5bcd6bbbac68f12",
            "name": "KeyBlade",
            "display": "Key Blade",
            "details": "Increases swing damage for each key you have",
            "rarity": "Common",
            "crafting": "-",
            "cost": 375,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 42,
                    "weight": 9
                },
                "relicAll": {
                    "index": 57,
                    "weight": 9
                }
            }
        },
        {
            "guid": "9919d2d2d31941f2a96f898d56e8d297",
            "name": "LegendaryBlade",
            "display": "Master Pickaxe",
            "details": "Fire projectiles at full health",
            "rarity": "Rare",
            "crafting": 50,
            "cost": 600,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 52,
                    "weight": 3
                },
                "relicAll": {
                    "index": 104,
                    "weight": 3
                },
                "relicFinal": {
                    "index": 14,
                    "weight": 3
                }
            }
        },
        {
            "guid": "49e257bc3ed04cde9e5b0a7089d7af10",
            "name": "Mjolnir",
            "display": "Mjölnir",
            "details": "Thrown pickaxe summons lightning on hit",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 850,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 5,
                    "weight": 1
                }
            }
        },
        {
            "guid": "212720105e1a4605b4d5bc4295a684cd",
            "name": "DoomBlade",
            "display": "Doom Blade",
            "details": "Gain damage for each carried curse",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 1000,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 4,
                    "weight": 1
                }
            }
        },
        {
            "guid": "2d5d75f5824242b781e8295d5f25b996",
            "name": "BattleAxe",
            "display": "Battle Axe",
            "details": "Increases swing size,but slightly decreases swing damage",
            "rarity": "Common",
            "crafting": "-",
            "cost": 450,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 74,
                    "weight": 9
                },
                "relicAll": {
                    "index": 40,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 23,
                    "weight": 9
                }
            }
        },
        {
            "guid": "2e1f6f7792eb4409a359778402737ed1",
            "name": "Glaive",
            "display": "Glaive",
            "details": "Increases throw size.",
            "rarity": "Common",
            "crafting": 26,
            "cost": 500,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 75,
                    "weight": 9
                },
                "relicAll": {
                    "index": 91,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 24,
                    "weight": 9
                }
            }
        },
        {
            "guid": "05ad55b489ff4af28e34ab471ecd0640",
            "name": "Masa",
            "display": "Masa",
            "details": "Reduces throw damage and increases swing damage",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 410,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 79,
                    "weight": 3
                },
                "relicAll": {
                    "index": 43,
                    "weight": 3
                }
            }
        },
        {
            "guid": "78d8214111974925b1e2039f20b728cf",
            "name": "Mune",
            "display": "Mune",
            "details": "Reduces swing damage and increases throw damage",
            "rarity": "Rare",
            "crafting": 1,
            "cost": 490,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 81,
                    "weight": 3
                },
                "relicAll": {
                    "index": 45,
                    "weight": 3
                }
            }
        },
        {
            "guid": "c5791c753f7e42de8a2814bd4b17504a",
            "name": "Masamune",
            "display": "Masamune",
            "details": "Instantly kills enemies sometimes",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 900,
            "extra": "Combined from Masa & Mune",
            "tables": {}
        },
        {
            "guid": "f568bbf4ecb54daf9d7d472f06d97521",
            "name": "Suneater",
            "display": "Suneater",
            "details": "Consumes all current and future blessings and converts them to swing damage",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 900,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 12,
                    "weight": 1
                }
            }
        },
        {
            "guid": "e161e4e3083948eaa22f9830394b1235",
            "name": "VorpalBlade",
            "display": "Vorpal Blade",
            "details": "Attack quickly without stopping",
            "rarity": "Common",
            "crafting": 50,
            "cost": 400,
            "extra": "Unique Swing",
            "tables": {
                "relic": {
                    "index": 88,
                    "weight": 9
                },
                "relicAll": {
                    "index": 50,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 26,
                    "weight": 9
                }
            }
        },
        {
            "guid": "66b7f22d45354e549d2a4a18ce9792f7",
            "name": "TwistedBlade",
            "display": "Twisted Blade",
            "details": "Increases critical strike chance for each carried curse",
            "rarity": "Common",
            "crafting": 30,
            "cost": 375,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 76,
                    "weight": 9
                },
                "relicAll": {
                    "index": 41,
                    "weight": 9
                }
            }
        },
        {
            "guid": "2945df6b2ea043dd94c67ba09aefbe2b",
            "name": "ObsidianKnife",
            "display": "Obsidian Knife",
            "details": "Dramatically increases damage,but breaks when hit",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 650,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 102,
                    "weight": 3
                },
                "relicAll": {
                    "index": 113,
                    "weight": 3
                },
                "relicFinal": {
                    "index": 30,
                    "weight": 3
                }
            }
        },
        {
            "guid": "54d1936d55494194a42d56c6f314c763",
            "name": "DirksHammer",
            "display": "Dirk's Hammer",
            "details": "Transmute an item by hitting it",
            "rarity": "Rare",
            "crafting": 50,
            "cost": 500,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 90,
                    "weight": 3
                },
                "relicAll": {
                    "index": 86,
                    "weight": 3
                },
                "relicShop": {
                    "index": 37,
                    "weight": 3
                }
            }
        },
        {
            "guid": "a8d3215241a94555866450ab791bc7e3",
            "name": "Resurrection",
            "display": "Resurrection",
            "details": "Resurrect on death",
            "rarity": "Rare",
            "crafting": 48,
            "cost": 1200,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 47,
                    "weight": 3
                },
                "relicAll": {
                    "index": 27,
                    "weight": 3
                },
                "relicFinal": {
                    "index": 12,
                    "weight": 6
                }
            }
        },
        {
            "guid": "623c929400f44c05b07827fef3426e60",
            "name": "GordonsTunic",
            "display": "Gordon's Tunic",
            "details": "Reduces elemental damage",
            "rarity": "Common",
            "crafting": 14,
            "cost": 280,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 61,
                    "weight": 9
                },
                "relicAll": {
                    "index": 95,
                    "weight": 9
                },
                "relicShop": {
                    "index": 21,
                    "weight": 9
                }
            }
        },
        {
            "guid": "b367a2746211405a8dda8d560f88b6d3",
            "name": "Breastplate",
            "display": "Breastplate",
            "details": "Adds a point of armor to the health bar",
            "rarity": "Common",
            "crafting": 55,
            "cost": 450,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 89,
                    "weight": 5
                },
                "relicAll": {
                    "index": 79,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 27,
                    "weight": 5
                }
            }
        },
        {
            "guid": "53f62e71c29143f79a27abca6069f52b",
            "name": "Pauldron",
            "display": "Pauldron",
            "details": "",
            "rarity": "Common",
            "crafting": "-",
            "cost": 450,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 101,
                    "weight": 5
                },
                "relicAll": {
                    "index": 112,
                    "weight": 5
                },
                "relicShop": {
                    "index": 45,
                    "weight": 5
                }
            }
        },
        {
            "guid": "2f342d2da24340b383d49f1fb9374e5a",
            "name": "Gauntlets",
            "display": "Gauntlets",
            "details": "Adds a point of armor to the health bar",
            "rarity": "Common",
            "crafting": 35,
            "cost": 450,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 99,
                    "weight": 5
                },
                "relicAll": {
                    "index": 110,
                    "weight": 5
                }
            }
        },
        {
            "guid": "e930152d55884ffbb8a0ce9edd6a46f1",
            "name": "Greaves",
            "display": "Greaves",
            "details": "Adds a point of armor to the health bar",
            "rarity": "Common",
            "crafting": "-",
            "cost": 450,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 100,
                    "weight": 5
                },
                "relicAll": {
                    "index": 111,
                    "weight": 5
                },
                "relicShop": {
                    "index": 44,
                    "weight": 5
                }
            }
        },
        {
            "guid": "19dc5130b5404db7a09262d609d9b8ba",
            "name": "ShieldofQuills",
            "display": "Shield of Quills",
            "details": "Gain two points of armor,armor increases damage",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 770,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 15,
                    "weight": 1
                }
            }
        },
        {
            "guid": "630bd51306d34a9c9de7b041f1a3caee",
            "name": "BlastSuit",
            "display": "Blast Suit",
            "details": "Invulnerability to friendly bomb blasts and increases bomb damage",
            "rarity": "Common",
            "crafting": 14,
            "cost": 275,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 91,
                    "weight": 9
                },
                "relicAll": {
                    "index": 76,
                    "weight": 9
                },
                "relicShop": {
                    "index": 38,
                    "weight": 9
                }
            }
        },
        {
            "guid": "ca4e94bdc2cc43329474ef40230aca52",
            "name": "Pillow",
            "display": "Hoodie's Pillow",
            "details": "Reduces physical damage",
            "rarity": "Rare",
            "crafting": 22,
            "cost": 350,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 21,
                    "weight": 3
                },
                "relicAll": {
                    "index": 11,
                    "weight": 3
                },
                "relicFinal": {
                    "index": 7,
                    "weight": 3
                }
            }
        },
        {
            "guid": "a1ca0abb4f8c47bbb719be48fb7fd470",
            "name": "SoulGuard",
            "display": "Soul Guard",
            "details": "Reduces and redirects damage to your max HP",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 850,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 16,
                    "weight": 1
                }
            }
        },
        {
            "guid": "2a64aa4851c94841ae297322646e6bdc",
            "name": "WetBlanket",
            "display": "Wet Blanket",
            "details": "Puts out fires immediately,but requires water charges",
            "rarity": "Common",
            "crafting": "-",
            "cost": 275,
            "extra": "",
            "tables": {
                "relicAll": {
                    "index": 69,
                    "weight": 9
                },
                "relicShop": {
                    "index": 34,
                    "weight": 9
                }
            }
        },
        {
            "guid": "95c9369deaba40caa44b1b48989a6a17",
            "name": "WarPaint",
            "display": "War Paint",
            "details": "Increase attack damage and speed when killing enemies",
            "rarity": "Common",
            "crafting": "-",
            "cost": 480,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 43,
                    "weight": 9
                },
                "relicAll": {
                    "index": 68,
                    "weight": 9
                }
            }
        },
        {
            "guid": "fd702e9d2662490f886876ee598b15d7",
            "name": "Battlestandard",
            "display": "Battle Standard",
            "details": "Increases move,attack,and throw speed at the beginning of battle",
            "rarity": "Common",
            "crafting": "-",
            "cost": 450,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 72,
                    "weight": 9
                },
                "relicAll": {
                    "index": 38,
                    "weight": 9
                }
            }
        },
        {
            "guid": "6bbe9142f1144e7cac6b0f2edf13cac9",
            "name": "Catalyst",
            "display": "Catalyst",
            "details": "When healed,heal again",
            "rarity": "Common",
            "crafting": 16,
            "cost": 280,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 62,
                    "weight": 9
                },
                "relicAll": {
                    "index": 80,
                    "weight": 9
                },
                "relicShop": {
                    "index": 22,
                    "weight": 9
                }
            }
        },
        {
            "guid": "ecb92c9f921647a69fa3bcd95bb535e7",
            "name": "SeltsEgg",
            "display": "Selt's Egg",
            "details": "Spawn larvae on entrance",
            "rarity": "Rare",
            "crafting": 15,
            "cost": 500,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 46,
                    "weight": 3
                },
                "relicAll": {
                    "index": 26,
                    "weight": 3
                }
            }
        },
        {
            "guid": "5482a1b1b71b433d886865f2394f2fcc",
            "name": "ElectrifiedOrb",
            "display": "Electrified Orb",
            "details": "Orbits the peasant and shocks enemies on contact",
            "rarity": "Rare",
            "crafting": 30,
            "cost": 425,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 85,
                    "weight": 3
                },
                "relicAll": {
                    "index": 89,
                    "weight": 3
                },
                "relicFinal": {
                    "index": 25,
                    "weight": 3
                }
            }
        },
        {
            "guid": "cd5580348c4d4a3cbcba94eafc169f4a",
            "name": "OthermineConduit",
            "display": "Othermine Conduit",
            "details": "Ghastly hands will attack the enemy",
            "rarity": "Rare",
            "crafting": 55,
            "cost": 480,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 73,
                    "weight": 3
                },
                "relicAll": {
                    "index": 39,
                    "weight": 3
                },
                "relicFinal": {
                    "index": 22,
                    "weight": 3
                }
            }
        },
        {
            "guid": "ca58b2a9d6cc4f56ae0699e33578a2e2",
            "name": "Doll",
            "display": "Doll",
            "details": "Blocks the next few curses.",
            "rarity": "Common",
            "crafting": 22,
            "cost": 375,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 78,
                    "weight": 9
                },
                "relicAll": {
                    "index": 87,
                    "weight": 9
                },
                "relicShop": {
                    "index": 30,
                    "weight": 9
                }
            }
        },
        {
            "guid": "d21a2fe3ce9d4fddb34a59dd4df3773f",
            "name": "Devotion",
            "display": "Devotion",
            "details": "Pray twice at altars",
            "rarity": "Common",
            "crafting": 30,
            "cost": 450,
            "extra": "",
            "tables": {
                "relicAll": {
                    "index": 85,
                    "weight": 9
                },
                "relicShop": {
                    "index": 16,
                    "weight": 9
                }
            }
        },
        {
            "guid": "4b36bbc087004750a1526304aef7b088",
            "name": "108Beads",
            "display": "108 Beads",
            "details": "Heal when praying at an altar",
            "rarity": "Common",
            "crafting": 12,
            "cost": 360,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 87,
                    "weight": 9
                },
                "relicAll": {
                    "index": 70,
                    "weight": 9
                },
                "relicShop": {
                    "index": 36,
                    "weight": 9
                }
            }
        },
        {
            "guid": "80242154d4284cc6aab221292cb0ae93",
            "name": "HolyGuacamole",
            "display": "Holy Guacamole",
            "details": "Find more altar rooms",
            "rarity": "Rare",
            "crafting": 20,
            "cost": 375,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 94,
                    "weight": 2
                },
                "relicAll": {
                    "index": 97,
                    "weight": 3
                }
            }
        },
        {
            "guid": "25d89c4cdce0444bb617016d3fa547d0",
            "name": "SonicBoom",
            "display": "Sonic Boom",
            "details": "Throw really fast",
            "rarity": "Common",
            "crafting": "-",
            "cost": 280,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 44,
                    "weight": 9
                },
                "relicAll": {
                    "index": 24,
                    "weight": 9
                }
            }
        },
        {
            "guid": "d8f7d033bec0417ab0b553f3a51a9a7f",
            "name": "SewingKit",
            "display": "Sewing Kit",
            "details": "Keep all your gold when you die",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 750,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 39,
                    "weight": 3
                },
                "relicAll": {
                    "index": 22,
                    "weight": 3
                },
                "relicShop": {
                    "index": 14,
                    "weight": 3
                }
            }
        },
        {
            "guid": "b29ea427f7f64aa3a06c8e19a0495648",
            "name": "SimpleChest",
            "display": "Simple Chest",
            "details": "Overstocks the shop",
            "rarity": "Common",
            "crafting": "-",
            "cost": 250,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 32,
                    "weight": 9
                },
                "relicAll": {
                    "index": 18,
                    "weight": 9
                },
                "relicShop": {
                    "index": 9,
                    "weight": 9
                }
            }
        },
        {
            "guid": "074da99ced7f4993b38cb90df3a27d84",
            "name": "MealTicket",
            "display": "Meal Ticket",
            "details": "Free food at the shop,right now!",
            "rarity": "Common",
            "crafting": "-",
            "cost": 300,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 23,
                    "weight": 9
                },
                "relicAll": {
                    "index": 13,
                    "weight": 9
                },
                "relicShop": {
                    "index": 6,
                    "weight": 9
                }
            }
        },
        {
            "guid": "6774d4be9573481f8e6fa97add614285",
            "name": "AdventurersHat",
            "display": "Adventurer's Hat",
            "details": "",
            "rarity": "Common",
            "crafting": 20,
            "cost": 250,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 58,
                    "weight": 9
                },
                "relicAll": {
                    "index": 71,
                    "weight": 6
                },
                "relicShop": {
                    "index": 20,
                    "weight": 6
                }
            }
        },
        {
            "guid": "376feb7893994baf826df320010a2eae",
            "name": "AdventurersWhip",
            "display": "Adventurer's Whip",
            "details": "",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 475,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 57,
                    "weight": 3
                },
                "relicAll": {
                    "index": 33,
                    "weight": 3
                }
            }
        },
        {
            "guid": "bc3b600bea3d416391e2549c137fff63",
            "name": "GoldenIdol",
            "display": "Golden Idol",
            "details": "Discover more rooms and get rich",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 725,
            "extra": "Combined from Adventurer's Hat & Adventurer's Whip",
            "tables": {}
        },
        {
            "guid": "d6045725bae4407ea8492ff1e4fa7c3f",
            "name": "TotemOfLife",
            "display": "Totem of Life",
            "details": "Sustain yourself through adventure",
            "rarity": "Common",
            "crafting": "-",
            "cost": 550,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 34,
                    "weight": 9
                },
                "relicAll": {
                    "index": 19,
                    "weight": 9
                }
            }
        },
        {
            "guid": "fe3df61649f84dd2b08492c1788d92af",
            "name": "AphoticCharm",
            "display": "Aphotic Charm",
            "details": "Heal in each new room for each curse",
            "rarity": "Common",
            "crafting": "18",
            "cost": 0,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 71,
                    "weight": 9
                },
                "relicAll": {
                    "index": 72,
                    "weight": 9
                },
                "relicShop": {
                    "index": 28,
                    "weight": 9
                }
            }
        },
        {
            "guid": "2380817a345d4458b5630768a38f35a1",
            "name": "DillonsClaw",
            "display": "Dillon's Claw",
            "details": "Deal even more damage when you critical strike",
            "rarity": "Common",
            "crafting": "-",
            "cost": 350,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 25,
                    "weight": 9
                },
                "relicAll": {
                    "index": 15,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 9,
                    "weight": 18
                }
            }
        },
        {
            "guid": "6910c28b900043d48911f9ae27e343cf",
            "name": "ShadowsFang",
            "display": "Shadow's Fang",
            "details": "Higher chance to critical strike",
            "rarity": "Common",
            "crafting": 10,
            "cost": 350,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 24,
                    "weight": 9
                },
                "relicAll": {
                    "index": 14,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 8,
                    "weight": 18
                }
            }
        },
        {
            "guid": "815f242a079240b8833a32c5f408e03a",
            "name": "BrambleVest",
            "display": "Bramble Vest",
            "details": "Return damage but amplified",
            "rarity": "Common",
            "crafting": "-",
            "cost": 200,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 26,
                    "weight": 9
                },
                "relicAll": {
                    "index": 16,
                    "weight": 9
                },
                "relicShop": {
                    "index": 29,
                    "weight": 9
                }
            }
        },
        {
            "guid": "be05dceb707e415ca9224898a15bd1d3",
            "name": "Duplicator",
            "display": "Duplicator",
            "details": "Relic rooms present a tantalizing choice",
            "rarity": "Rare",
            "crafting": 26,
            "cost": 600,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 31,
                    "weight": 3
                },
                "relicAll": {
                    "index": 88,
                    "weight": 3
                },
                "relicShop": {
                    "index": 8,
                    "weight": 3
                }
            }
        },
        {
            "guid": "87447b9566774ef486aa065a51a2bf4e",
            "name": "Hyperstone",
            "display": "Hyperstone",
            "details": "Increase attack speed",
            "rarity": "Rare",
            "crafting": 45,
            "cost": 510,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 37,
                    "weight": 3
                },
                "relicAll": {
                    "index": 99,
                    "weight": 3
                },
                "relicFinal": {
                    "index": 10,
                    "weight": 18
                }
            }
        },
        {
            "guid": "262277e1e3914d1aae80a2d9f5acb3bd",
            "name": "MinersFlask",
            "display": "Miner's Flask",
            "details": "Feel the effects of a potion for longer",
            "rarity": "Common",
            "crafting": "-",
            "cost": 375,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 36,
                    "weight": 9
                },
                "relicAll": {
                    "index": 21,
                    "weight": 9
                },
                "relicShop": {
                    "index": 13,
                    "weight": 9
                }
            }
        },
        {
            "guid": "1e47701bb3324ddfb2c097dda2506453",
            "name": "Lunchbox",
            "display": "Lunchbox",
            "details": "Store a piece of food for later",
            "rarity": "Common",
            "crafting": "-",
            "cost": 380,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 80,
                    "weight": 9
                },
                "relicAll": {
                    "index": 44,
                    "weight": 9
                },
                "relicShop": {
                    "index": 32,
                    "weight": 9
                }
            }
        },
        {
            "guid": "2725a7b0032447a98b7604d29395317a",
            "name": "Immolate",
            "display": "Large Ember",
            "details": "",
            "rarity": "Rare",
            "crafting": 20,
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 29,
                    "weight": 3
                },
                "relicAll": {
                    "index": 100,
                    "weight": 3
                }
            }
        },
        {
            "guid": "70965440d15240d1a7ac7c8ddff4c9b2",
            "name": "ItemPopcorn",
            "display": "Popcorn",
            "details": "Items will sometimes duplicate themselves",
            "rarity": "Common",
            "crafting": 16,
            "cost": 650,
            "extra": "",
            "tables": {
                "relicAll": {
                    "index": 102,
                    "weight": 9
                },
                "relicShop": {
                    "index": 10,
                    "weight": 9
                }
            }
        },
        {
            "guid": "6b18a3a60fe342f1833aff1526898e11",
            "name": "GoldPopcorn",
            "display": "Golden Popcorn",
            "details": "Gold will sometimes duplicate itself",
            "rarity": "Common",
            "crafting": "-",
            "cost": 550,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 35,
                    "weight": 9
                },
                "relicAll": {
                    "index": 20,
                    "weight": 9
                },
                "relicShop": {
                    "index": 11,
                    "weight": 9
                },
                "relicStarter": {
                    "index": 3,
                    "weight": 9
                }
            }
        },
        {
            "guid": "81b81569168949aeaea9412aea00601d",
            "name": "FoodPopcorn",
            "display": "Seasoned Popcorn",
            "details": "Food will sometimes duplicate itself",
            "rarity": "Common",
            "crafting": "-",
            "cost": 500,
            "extra": "",
            "tables": {
                "relicAll": {
                    "index": 55,
                    "weight": 9
                },
                "relicShop": {
                    "index": 12,
                    "weight": 9
                }
            }
        },
        {
            "guid": "586b91a55c884c48832f9503dd8947c2",
            "name": "CaramelPopcorn",
            "display": "Caramel Popcorn",
            "details": "Duplicated food packs a surprise",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 1100,
            "extra": "Combined from Golden Popcorn & Seasoned Popcorn",
            "tables": {}
        },
        {
            "guid": "ebb2f31ddd77460196d44fabcd18f57a",
            "name": "PocketGrill",
            "display": "Pocket Grill",
            "details": "Cooks all your food",
            "rarity": "Common",
            "crafting": "-",
            "cost": 500,
            "extra": "",
            "tables": {
                "relicAll": {
                    "index": 65,
                    "weight": 9
                },
                "relicShop": {
                    "index": 17,
                    "weight": 9
                }
            }
        },
        {
            "guid": "6851f6a8812f4bcbabaa9a2414ec70d5",
            "name": "Leftovers",
            "display": "Leftovers",
            "details": "Find old, gross food in chests",
            "rarity": "Common",
            "crafting": "-",
            "cost": 475,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 27,
                    "weight": 9
                },
                "relicAll": {
                    "index": 61,
                    "weight": 9
                },
                "relicShop": {
                    "index": 7,
                    "weight": 9
                }
            }
        },
        {
            "guid": "ed388fc9c09943bc987cf1c3388e8755",
            "name": "SpareOrdinance",
            "display": "Spare Ordnance",
            "details": "Discover a bomb in every chest",
            "rarity": "Common",
            "crafting": "-",
            "cost": 450,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 28,
                    "weight": 9
                },
                "relicAll": {
                    "index": 108,
                    "weight": 9
                },
                "relicShop": {
                    "index": 43,
                    "weight": 9
                }
            }
        },
        {
            "guid": "f7eca5455bdf49fe9d2dafd4ec32d1e7",
            "name": "Miniaturizer",
            "display": "Miniaturizer",
            "details": "Find small boxes in big boxes",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 850,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 7,
                    "weight": 1
                }
            }
        },
        {
            "guid": "5abbafb002b04ee495f179afdb550ffa",
            "name": "KeyDoubler",
            "display": "Key Doubler",
            "details": "Sometimes drop a new key when using an old key",
            "rarity": "Common",
            "crafting": "-",
            "cost": 480,
            "extra": "",
            "tables": {
                "relicAll": {
                    "index": 58,
                    "weight": 9
                },
                "relicShop": {
                    "index": 4,
                    "weight": 9
                }
            }
        },
        {
            "guid": "e56c7298c19e47d990140eceb14b95cc",
            "name": "BombDoubler",
            "display": "Bomb Doubler",
            "details": "Sometimes drop a new bomb when using an old bomb",
            "rarity": "Common",
            "crafting": 18,
            "cost": 500,
            "extra": "",
            "tables": {
                "relicAll": {
                    "index": 78,
                    "weight": 9
                },
                "relicShop": {
                    "index": 5,
                    "weight": 9
                }
            }
        },
        {
            "guid": "fb374cc41c744cdbbbe227889cf001c4",
            "name": "DoubleDoubler",
            "display": "Double Doubler",
            "details": "Chance to drop a key and bomb when using either",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 980,
            "extra": "Combined from Key Doubler & Bomb Doubler",
            "tables": {}
        },
        {
            "guid": "ec20d69533674c59a1af67db438bf172",
            "name": "PilfersGift",
            "display": "Pilfer's Gift",
            "details": "Be blessed with two gifts from the pilfers",
            "rarity": "Rare",
            "crafting": 99,
            "cost": 900,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 30,
                    "weight": 3
                },
                "relicAll": {
                    "index": 17,
                    "weight": 3
                }
            }
        },
        {
            "guid": "cad1d7d1cd454671ac62d6496c5aa49e",
            "name": "GoldenBombs",
            "display": "Golden Powder",
            "details": "Turns rock into gold",
            "rarity": "Common",
            "crafting": 15,
            "cost": 750,
            "extra": "Unique Bomb",
            "tables": {
                "relic": {
                    "index": 0,
                    "weight": 9
                },
                "relicAll": {
                    "index": 92,
                    "weight": 9
                }
            }
        },
        {
            "guid": "82d1d9ec3cb74d019e07ac5750e5433d",
            "name": "ClusterBombs",
            "display": "Bombushka",
            "details": "Bombs, in bombs, in bombs",
            "rarity": "Common",
            "crafting": "-",
            "cost": 400,
            "extra": "Unique Bomb",
            "tables": {
                "relic": {
                    "index": 1,
                    "weight": 9
                },
                "relicAll": {
                    "index": 0,
                    "weight": 9
                },
                "relicStarter": {
                    "index": 2,
                    "weight": 9
                }
            }
        },
        {
            "guid": "04579544c0354d24a712f465b0a4a504",
            "name": "IncendiaryBombs",
            "display": "Seer's Blood",
            "details": "Bombs explode in a shower of fire",
            "rarity": "Common",
            "crafting": "-",
            "cost": 350,
            "extra": "Unique Bomb",
            "tables": {
                "relic": {
                    "index": 2,
                    "weight": 9
                },
                "relicAll": {
                    "index": 1,
                    "weight": 9
                }
            }
        },
        {
            "guid": "96b62be9e4f04a329eed69ab143957aa",
            "name": "RookBombs",
            "display": "Rook's Bomb",
            "details": "Death at ninety degrees",
            "rarity": "Common",
            "crafting": "-",
            "cost": 480,
            "extra": "Unique Bomb",
            "tables": {
                "relic": {
                    "index": 3,
                    "weight": 9
                },
                "relicAll": {
                    "index": 2,
                    "weight": 9
                }
            }
        },
        {
            "guid": "80c079e5b87345b28557d545c6f0131e",
            "name": "BishopBombs",
            "display": "Bishop's Bomb",
            "details": "Death at forty five degrees",
            "rarity": "Common",
            "crafting": 8,
            "cost": 470,
            "extra": "Unique Bomb",
            "tables": {
                "relic": {
                    "index": 38,
                    "weight": 9
                },
                "relicAll": {
                    "index": 75,
                    "weight": 9
                }
            }
        },
        {
            "guid": "78622bf8ccfb4b6b8f4ad11165615e88",
            "name": "QueenBombs",
            "display": "Queen's Bomb",
            "details": "Death in all directions",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 950,
            "extra": "Unique Bomb\nCombined from Rook's Bomb & Bishop's Bomb",
            "tables": {}
        },
        {
            "guid": "079a976e3dd24ea8819941b9f81259c2",
            "name": "TransmutagenBombs",
            "display": "Transmutagen Blast",
            "details": "Transforms items",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 1111,
            "extra": "Unique Bomb",
            "tables": {
                "relicLegendary": {
                    "index": 13,
                    "weight": 1
                }
            }
        },
        {
            "guid": "01dd414291604477aa1405b5683a29a3",
            "name": "BrandingBombs",
            "display": "Branding Bomb",
            "details": "Bombs brand enemies for sacrifice, +10 bombs",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 666,
            "extra": "Unique Bomb",
            "tables": {
                "relicLegendary": {
                    "index": 11,
                    "weight": 1
                }
            }
        },
        {
            "guid": "0948c27e6bf3483292c1e2e065499018",
            "name": "LightningBombs",
            "display": "Lightning Bomb",
            "details": "Bomb explosions chain lightning",
            "rarity": "Common",
            "crafting": "-",
            "cost": 350,
            "extra": "Unique Bomb",
            "tables": {
                "relic": {
                    "index": 4,
                    "weight": 9
                },
                "relicAll": {
                    "index": 62,
                    "weight": 9
                }
            }
        },
        {
            "guid": "f3fc59fe276e4b5eb28425f43940c0f8",
            "name": "MidasBombs",
            "display": "M.E.G.A. Bomb",
            "details": "A mess of electrified gold",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 0,
            "extra": "Combined from Lightning Bomb & Golden Powder",
            "tables": {}
        },
        {
            "guid": "5e270234064d40d08b17881eee751dfd",
            "name": "BloodBomb",
            "display": "Blood Bomb",
            "details": "Leeches life from enemies slain by bombs",
            "rarity": "Common",
            "crafting": 10,
            "cost": 430,
            "extra": "Unique Bomb",
            "tables": {
                "relic": {
                    "index": 93,
                    "weight": 9
                },
                "relicAll": {
                    "index": 77,
                    "weight": 9
                }
            }
        },
        {
            "guid": "7a06da12309d4136917c71be7772e055",
            "name": "TsarBomba",
            "display": "Tsar Bomba",
            "details": "Killing enemies with a bomb spawns a new bomb. Carried bombs decrease swing and throw damage.",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 875,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 14,
                    "weight": 1
                }
            }
        },
        {
            "guid": "c3cf34b72ca743f7986c53215ec3a358",
            "name": "U235",
            "display": "U-235",
            "details": "Bomb damage is proportional to the number of carried bombs, +5 bombs",
            "rarity": "Rare",
            "crafting": 60,
            "cost": 560,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 84,
                    "weight": 3
                },
                "relicAll": {
                    "index": 48,
                    "weight": 3
                }
            }
        },
        {
            "guid": "8c781614f3e545cd9dc53a1862f87dc7",
            "name": "Shrapnel",
            "display": "Shrapnel",
            "details": "Friendly bomb blasts fire projectiles",
            "rarity": "Common",
            "crafting": "-",
            "cost": 310,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 111,
                    "weight": 9
                },
                "relicAll": {
                    "index": 122,
                    "weight": 9
                },
                "relicShop": {
                    "index": 52,
                    "weight": 9
                }
            }
        },
        {
            "guid": "3640d085d4624902a191cefbacabd840",
            "name": "GeckoBlast",
            "display": "Gecko Blast",
            "details": "Bomb blasts attract items",
            "rarity": "Common",
            "crafting": "-",
            "cost": 500,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 97,
                    "weight": 1
                },
                "relicAll": {
                    "index": 107,
                    "weight": 1
                },
                "relicShop": {
                    "index": 42,
                    "weight": 9
                }
            }
        },
        {
            "guid": "fd98fd90983c49f49e88267708a16807",
            "name": "CaptureSphere",
            "display": "Capture Sphere",
            "details": "Bomb kills permanently increase bomb damage",
            "rarity": "Common",
            "crafting": "-",
            "cost": 285,
            "extra": "",
            "tables": {
                "relicShop": {
                    "index": 47,
                    "weight": 9
                }
            }
        },
        {
            "guid": "a1231c3c35814d68aaae8d98cc882fd9",
            "name": "RemoteDetonator",
            "display": "Remote Detonator",
            "details": "Detonate bombs when you feel like it",
            "rarity": "Rare",
            "crafting": 30,
            "cost": 375,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 82,
                    "weight": 3
                },
                "relicAll": {
                    "index": 46,
                    "weight": 3
                },
                "relicShop": {
                    "index": 33,
                    "weight": 3
                }
            }
        },
        {
            "guid": "403c20cf86844b8ba5a495752f890817",
            "name": "ShortWicks",
            "display": "Short Wicks",
            "details": "Reduces the bomb cooldown",
            "rarity": "Common",
            "crafting": 20,
            "cost": 225,
            "extra": "",
            "tables": {
                "relicShop": {
                    "index": 46,
                    "weight": 9
                }
            }
        },
        {
            "guid": "724a50c9ac524f9fb3f527a5052e02a6",
            "name": "Guantes",
            "display": "Guantes",
            "details": "Throw that pickaxe a bit harder",
            "rarity": "Common",
            "crafting": 10,
            "cost": 500,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 11,
                    "weight": 9
                },
                "relicAll": {
                    "index": 96,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 3,
                    "weight": 9
                }
            }
        },
        {
            "guid": "1808d1da72b540c1a611a560f5f89fb3",
            "name": "SequenceBreaker",
            "display": "Sequence Breaker",
            "details": "Teleport to your pickaxe",
            "rarity": "Common",
            "crafting": 26,
            "cost": 500,
            "extra": "Unique Throw",
            "tables": {
                "relic": {
                    "index": 68,
                    "weight": 9
                },
                "relicAll": {
                    "index": 37,
                    "weight": 9
                },
                "relicShop": {
                    "index": 27,
                    "weight": 9
                }
            }
        },
        {
            "guid": "67aea971b4214697bb0cf4bdc4e904aa",
            "name": "ThrowingStar",
            "display": "Throwing Star",
            "details": "Thrown pickaxe penetrates enemies and objects",
            "rarity": "Common",
            "crafting": 16,
            "cost": 350,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 86,
                    "weight": 9
                },
                "relicAll": {
                    "index": 49,
                    "weight": 9
                }
            }
        },
        {
            "guid": "b4e5f598694c439d8260e8539e0320b2",
            "name": "Guidance",
            "display": "Guidance",
            "details": "400",
            "rarity": "Common",
            "crafting": "-",
            "cost": 400,
            "extra": "Unique Throw",
            "tables": {
                "relic": {
                    "index": 9,
                    "weight": 9
                },
                "relicAll": {
                    "index": 6,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 1,
                    "weight": 9
                },
                "relicStarter": {
                    "index": 4,
                    "weight": 9
                }
            }
        },
        {
            "guid": "01e0ef72372d4531a4a1cdb3cc265f97",
            "name": "PhantasmalAxe",
            "display": "Phantasmal Axe",
            "details": "Thrown pickaxes duplicate themselves",
            "rarity": "Common",
            "crafting": "-",
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 95,
                    "weight": 9
                },
                "relicAll": {
                    "index": 63,
                    "weight": 9
                },
                "relicStarter": {
                    "index": 5,
                    "weight": 9
                }
            }
        },
        {
            "guid": "830216e9492c484489ef90c303f07b68",
            "name": "Chakram",
            "display": "Chakram",
            "details": "Throw a whirling blade of death",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 800,
            "extra": "Unique Throw",
            "tables": {
                "relicLegendary": {
                    "index": 1,
                    "weight": 1
                }
            }
        },
        {
            "guid": "48f2bb8ba1f742ca830edfaa91772625",
            "name": "Fork",
            "display": "Fork",
            "details": "Splits your ranged attacks",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 104,
                    "weight": 3
                },
                "relicAll": {
                    "index": 115,
                    "weight": 3
                },
                "relicStarter": {
                    "index": 8,
                    "weight": 1
                }
            }
        },
        {
            "guid": "b6f58486915b43b8bcd0004d74f9182b",
            "name": "BottledLightning",
            "display": "Bottled Lightning",
            "details": "Chance on hit to chain lightning",
            "rarity": "Common",
            "crafting": "-",
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 7,
                    "weight": 9
                },
                "relicAll": {
                    "index": 4,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 0,
                    "weight": 9
                },
                "relicStarter": {
                    "index": 0,
                    "weight": 9
                }
            }
        },
        {
            "guid": "efa267f58ead4081a7c8d7769a5e6bf8",
            "name": "SalamanderTail",
            "display": "Salamander Tail",
            "details": "Chance on hit to ignite your enemies",
            "rarity": "Common",
            "crafting": "-",
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 8,
                    "weight": 9
                },
                "relicAll": {
                    "index": 5,
                    "weight": 9
                },
                "relicStarter": {
                    "index": 7,
                    "weight": 9
                }
            }
        },
        {
            "guid": "aede3a51037549b9b0eeeec881d5168e",
            "name": "CripplingPoison",
            "display": "Crippling Poison",
            "details": "Chance on hit to poison your enemies",
            "rarity": "Common",
            "crafting": 14,
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 64,
                    "weight": 9
                },
                "relicAll": {
                    "index": 83,
                    "weight": 9
                }
            }
        },
        {
            "guid": "e25c4adfa3e04022ae18673db8f83276",
            "name": "CausticVial",
            "display": "Caustic Vial",
            "details": "Enemies hit with the thrown pickaxe explode on death",
            "rarity": "Common",
            "crafting": 24,
            "cost": 375,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 92,
                    "weight": 9
                },
                "relicAll": {
                    "index": 81,
                    "weight": 9
                }
            }
        },
        {
            "guid": "0c33fc50f8d94d518803789c0b7f2185",
            "name": "CrackedOrb",
            "display": "Cracked Orb",
            "details": "Curse enemies with increased damage",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 460,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 15,
                    "weight": 3
                },
                "relicAll": {
                    "index": 9,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 5,
                    "weight": 3
                }
            }
        },
        {
            "guid": "9fcfbe4652be48ec82ea6a8431a18d37",
            "name": "UrsineRing",
            "display": "Ursine Ring",
            "details": "Increase health",
            "rarity": "Common",
            "crafting": "-",
            "cost": 500,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 10,
                    "weight": 9
                },
                "relicAll": {
                    "index": 67,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 2,
                    "weight": 9
                }
            }
        },
        {
            "guid": "29799d6270d24f018cef3d360eebc5e7",
            "name": "DemonRing",
            "display": "Demon Ring",
            "details": "Increase swing damage",
            "rarity": "Common",
            "crafting": "-",
            "cost": 500,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 12,
                    "weight": 9
                },
                "relicAll": {
                    "index": 7,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 4,
                    "weight": 18
                }
            }
        },
        {
            "guid": "651c313904884b19afcd5a1da136c01c",
            "name": "MediocreRing",
            "display": "Mediocre Ring",
            "details": "Increases health and damage",
            "rarity": "Common",
            "crafting": 8,
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 63,
                    "weight": 9
                },
                "relicAll": {
                    "index": 35,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 20,
                    "weight": 9
                }
            }
        },
        {
            "guid": "3693999de5e94fcd81b5fcd53c13e8b4",
            "name": "BerserkerPendant",
            "display": "Berserker's Pendant",
            "details": "Deal more swing damage at low health",
            "rarity": "Common",
            "crafting": 20,
            "cost": 420,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 16,
                    "weight": 9
                },
                "relicAll": {
                    "index": 74,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 6,
                    "weight": 9
                }
            }
        },
        {
            "guid": "2fe62c4bfc084a7a8516c18f23575fb3",
            "name": "AxeThrowersPendant",
            "display": "Axe Thrower's Pendant",
            "details": "Deal more throw damage at low health",
            "rarity": "Common",
            "crafting": "-",
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 59,
                    "weight": 9
                },
                "relicAll": {
                    "index": 34,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 18,
                    "weight": 9
                }
            }
        },
        {
            "guid": "10444b01cc944bdc92bbc183ecfd4dfe",
            "name": "KnightPendant",
            "display": "Knight's Pendant",
            "details": "Deal more swing damage at high health",
            "rarity": "Common",
            "crafting": "-",
            "cost": 420,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 53,
                    "weight": 9
                },
                "relicAll": {
                    "index": 59,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 15,
                    "weight": 9
                }
            }
        },
        {
            "guid": "77af6531c8294f249cf55fd69c74bd8a",
            "name": "ArchersPendant",
            "display": "Archer's Pendant",
            "details": "Deal more throw damage at high health",
            "rarity": "Common",
            "crafting": 20,
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 60,
                    "weight": 9
                },
                "relicAll": {
                    "index": 73,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 19,
                    "weight": 9
                }
            }
        },
        {
            "guid": "e790a903a95240ffa6ff75f0c17475cd",
            "name": "IronBranch",
            "display": "Iron Branch",
            "details": "Increase health, swing damage, and attack speed",
            "rarity": "Common",
            "crafting": "-",
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 49,
                    "weight": 9
                },
                "relicAll": {
                    "index": 29,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 13,
                    "weight": 9
                }
            }
        },
        {
            "guid": "e21cf8a29a6b4277b40ba59cb04c299b",
            "name": "CrownQueens",
            "display": "Queen's Crown",
            "details": "Increase throw damage, swing size, and swing speed",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 550,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 54,
                    "weight": 3
                },
                "relicAll": {
                    "index": 31,
                    "weight": 3
                },
                "relicFinal": {
                    "index": 16,
                    "weight": 6
                }
            }
        },
        {
            "guid": "0248a19ceeb042c096a827dbcb5b10de",
            "name": "CrownKings",
            "display": "King's Crown",
            "details": "Increase swing damage, throw size, and throw speed",
            "rarity": "Rare",
            "crafting": 26,
            "cost": 550,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 55,
                    "weight": 3
                },
                "relicAll": {
                    "index": 84,
                    "weight": 3
                }
            }
        },
        {
            "guid": "5efb8642758041cfb29b8555ce405f41",
            "name": "CrownEmperors",
            "display": "Emperor's Crown",
            "details": "Increases stats and receive a blessing",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 1100,
            "extra": "Combined from Queen's Crown & King's Crown",
            "tables": {}
        },
        {
            "guid": "6e31da144f9b4820a3442e42883a52e5",
            "name": "PilferRing",
            "display": "Pilfer Ring",
            "details": "Soak up gold and get a discount at the shop",
            "rarity": "Common",
            "crafting": "-",
            "cost": 800,
            "extra": "",
            "tables": {
                "relicAll": {
                    "index": 64,
                    "weight": 9
                },
                "relicShop": {
                    "index": 0,
                    "weight": 9
                }
            }
        },
        {
            "guid": "7c1a74b4bc5e4398b2a10459f9b50b21",
            "name": "UnstableConcoction",
            "display": "Unstable Concoction",
            "details": "Gold hits the floor with explosive force",
            "rarity": "Common",
            "crafting": "-",
            "cost": 420,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 33,
                    "weight": 9
                },
                "relicAll": {
                    "index": 66,
                    "weight": 9
                }
            }
        },
        {
            "guid": "9c707dd6871a44b7b7326ad378f41a38",
            "name": "GoldTooth",
            "display": "Gold Tooth",
            "details": "Sustain yourself on gold",
            "rarity": "Common",
            "crafting": 15,
            "cost": 600,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 20,
                    "weight": 9
                },
                "relicAll": {
                    "index": 94,
                    "weight": 9
                }
            }
        },
        {
            "guid": "ebe6a743ac76455ea4771e300ebc0b7b",
            "name": "GoldenDelicious",
            "display": "Golden Delicious",
            "details": "All food is golden and extra delicious",
            "rarity": "Common",
            "crafting": 8,
            "cost": 150,
            "extra": "",
            "tables": {
                "relicAll": {
                    "index": 93,
                    "weight": 9
                },
                "relicShop": {
                    "index": 3,
                    "weight": 9
                }
            }
        },
        {
            "guid": "277d2316237d49109d6d1439f7df6e14",
            "name": "Conductor",
            "display": "Conductor",
            "details": "Electrify your enemies when picking up gold",
            "rarity": "Common",
            "crafting": "-",
            "cost": 550,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 19,
                    "weight": 9
                },
                "relicAll": {
                    "index": 10,
                    "weight": 9
                }
            }
        },
        {
            "guid": "0533edf2633049baa08a73d7ba5ef518",
            "name": "GoldFrenzy",
            "display": "Gold Frenzy",
            "details": "Gain temporary damage when picking up gold",
            "rarity": "Common",
            "crafting": "-",
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 45,
                    "weight": 9
                },
                "relicAll": {
                    "index": 25,
                    "weight": 9
                }
            }
        },
        {
            "guid": "7c3dcc99d36d4f6f8bcc2524ecdb93e8",
            "name": "Intensifier",
            "display": "Intensifier",
            "details": "Increases damage when killing enemies",
            "rarity": "Common",
            "crafting": "-",
            "cost": 500,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 14,
                    "weight": 9
                },
                "relicAll": {
                    "index": 8,
                    "weight": 9
                }
            }
        },
        {
            "guid": "a596ffca42664024be1aeba28ad46f24",
            "name": "SkullShield",
            "display": "Floating Skull",
            "details": "A shield that blocks projectiles, most of the time",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 40,
                    "weight": 3
                },
                "relicAll": {
                    "index": 23,
                    "weight": 3
                },
                "relicStarter": {
                    "index": 6,
                    "weight": 9
                }
            }
        },
        {
            "guid": "23ed5e24dd3c420eacbf5c006e61be87",
            "name": "ReflectProjectiles",
            "display": "Grimhilde's Mirror",
            "details": "Return projectiles with an attack",
            "rarity": "Common",
            "crafting": "-",
            "cost": 350,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 22,
                    "weight": 9
                },
                "relicAll": {
                    "index": 12,
                    "weight": 9
                }
            }
        },
        {
            "guid": "db4baf760be740b99ff679a838ee3ee4",
            "name": "MirrorShield",
            "display": "Mirror Shield",
            "details": "Automatically reflect projectiles",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 750,
            "extra": "Combined from Floating Skull & Grimhilde's Mirror",
            "tables": {}
        },
        {
            "guid": "91f466ecbb87497b943eabd77f6e4681",
            "name": "HungrySpirit",
            "display": "Hungry Ghost",
            "details": "Leach the life of your enemies",
            "rarity": "Rare",
            "crafting": 25,
            "cost": 480,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 13,
                    "weight": 3
                },
                "relicAll": {
                    "index": 98,
                    "weight": 3
                }
            }
        },
        {
            "guid": "dd44a1f545ad48cda6d653cb6b5eaafb",
            "name": "NullStone",
            "display": "Nullstone",
            "details": "Block a hit once in a while",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 650,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 8,
                    "weight": 1
                }
            }
        },
        {
            "guid": "35ccd3bee9604d10988601bfecb53a3a",
            "name": "Mushroom",
            "display": "Mushroom",
            "details": "Gain maximum health when killing enemies",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 540,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 9,
                    "weight": 1
                }
            }
        },
        {
            "guid": "eaf60a76dda742928cdd8f75d3e22eca",
            "name": "Clover",
            "display": "Four Leaf Clover",
            "details": "Hit the gold right out of your enemies' pockets",
            "rarity": "Rare",
            "crafting": 22,
            "cost": 525,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 18,
                    "weight": 3
                },
                "relicAll": {
                    "index": 82,
                    "weight": 3
                },
                "relicShop": {
                    "index": 2,
                    "weight": 3
                }
            }
        },
        {
            "guid": "69994ce940d94e439ab01d04a9c176e7",
            "name": "Tent",
            "display": "Tent",
            "details": "Adds a tent to the starting room of a floor, one use only",
            "rarity": "Common",
            "crafting": "-",
            "cost": 300,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 77,
                    "weight": 9
                },
                "relicAll": {
                    "index": 42,
                    "weight": 9
                },
                "relicShop": {
                    "index": 39,
                    "weight": 9
                }
            }
        },
        {
            "guid": "56fb37c63e434aa08fa3c868c3c4d9c3",
            "name": "Aegis",
            "display": "Aegis",
            "details": "Increase defense at critical health",
            "rarity": "Common",
            "crafting": "-",
            "cost": 350,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 56,
                    "weight": 9
                },
                "relicAll": {
                    "index": 32,
                    "weight": 9
                },
                "relicShop": {
                    "index": 19,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 17,
                    "weight": 9
                }
            }
        },
        {
            "guid": "fdf3edb47a594d0f870acabb1d82d433",
            "name": "Map",
            "display": "Map",
            "details": "Get a peep at your surroundings",
            "rarity": "Rare",
            "crafting": 20,
            "cost": 250,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 17,
                    "weight": 3
                },
                "relicAll": {
                    "index": 106,
                    "weight": 3
                },
                "relicShop": {
                    "index": 1,
                    "weight": 3
                }
            }
        },
        {
            "guid": "d537cbb8584b4a3fbe45f0ceef4f2ef1",
            "name": "PetrifiedRock",
            "display": "Petrified Rock",
            "details": "Increase drop rate of items from rocks",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 999,
            "extra": "",
            "tables": {}
        },
        {
            "guid": "3776afb876a74e50911b6d3080f0388d",
            "name": "RatBond",
            "display": "Rat Bond",
            "details": "Become charming to rats",
            "rarity": "Rare",
            "crafting": 15,
            "cost": 250,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 51,
                    "weight": 3
                },
                "relicAll": {
                    "index": 30,
                    "weight": 3
                }
            }
        },
        {
            "guid": "97fbd863c09b44fa9605e675e7275f85",
            "name": "CosmicEgg",
            "display": "Cosmic Egg",
            "details": "Increases experience gain for a familiar",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 750,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 65,
                    "weight": 3
                },
                "relicAll": {
                    "index": 36,
                    "weight": 3
                },
                "relicShop": {
                    "index": 23,
                    "weight": 3
                }
            }
        },
        {
            "guid": "3d321813e7904a1486d6243defa59cc3",
            "name": "BirthingPod",
            "display": "Birthing Pod",
            "details": "Consumes all healing until birth",
            "rarity": "Rare",
            "crafting": 50,
            "cost": 1000,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 103,
                    "weight": 3
                },
                "relicAll": {
                    "index": 114,
                    "weight": 3
                },
                "relicShop": {
                    "index": 50,
                    "weight": 3
                }
            }
        },
        {
            "guid": "898d87f98b184697ac89672f9bf955e4",
            "name": "CreditCardSilver",
            "display": "Pilfer Credit Card Silver",
            "details": "A Gold10.png 2,500 limit at 0% interest",
            "rarity": "Common",
            "crafting": "-",
            "cost": 1,
            "extra": "",
            "tables": {
                "relicAll": {
                    "index": 53,
                    "weight": 3
                },
                "relicShop": {
                    "index": 24,
                    "weight": 9
                }
            }
        },
        {
            "guid": "f83c843bf28e48afbb6f3aec7d5d0eed",
            "name": "CreditCardGold",
            "display": "Pilfer Credit Card Gold",
            "details": "A Gold10.png 5,000 limit at 0% interest",
            "rarity": "Common",
            "crafting": "-",
            "cost": 1,
            "extra": "",
            "tables": {
                "relicAll": {
                    "index": 52,
                    "weight": 1
                },
                "relicShop": {
                    "index": 41,
                    "weight": 1
                }
            }
        },
        {
            "guid": "87dd4661d57b48c3812b4c962c00cc2e",
            "name": "CreditCardBlack",
            "display": "Pilfer Credit Card Black Edition",
            "details": "7,500 limit and 5% cash back",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 0,
            "extra": "Combined from Pilfer Credit Card Silver & Pilfer Credit Card Gold",
            "tables": {}
        },
        {
            "guid": "189b6fc98b1849ea848523610481af7d",
            "name": "ButchersClover",
            "display": "Four Leaf Cleaver",
            "details": "Sometimes drop golden meat from your enemies",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 1050,
            "extra": "Combined from Butcher's Cleaver & Four Leaf Clover",
            "tables": {}
        },
        {
            "guid": "f3973f00fda94bfbb4eed373ed28b775",
            "name": "RabbitGloves",
            "display": "Rabbit Gloves",
            "details": "Get a free item in every shop",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 1200,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 3,
                    "weight": 1
                }
            }
        },
        {
            "guid": "4202645d8fa34a97a70ded11ee0f8f31",
            "name": "KarmicScale",
            "display": "Karmic Scale",
            "details": "Health, damage, and healing become small and even",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 1100,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 2,
                    "weight": 1
                }
            }
        },
        {
            "guid": "bab552535a104b059e636abfd7d05685",
            "name": "PocketOfHolding",
            "display": "Pocket of Holding",
            "details": "Get some temporary bombs each room",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 550,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 6,
                    "weight": 1
                }
            }
        },
        {
            "guid": "4cf72d4585f64a95b4d614bd559e4d58",
            "name": "LockPick",
            "display": "Lockpick",
            "details": "Open locks for free, but for how long?",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 900,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 0,
                    "weight": 1
                }
            }
        },
        {
            "guid": "5a5b61097a034cfeb6858d2d6c809af0",
            "name": "LuckyCharm",
            "display": "Lucky Charm",
            "details": "A chance at avoiding death",
            "rarity": "Common",
            "crafting": 38,
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 67,
                    "weight": 9
                },
                "relicAll": {
                    "index": 105,
                    "weight": 9
                },
                "relicShop": {
                    "index": 26,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 21,
                    "weight": 9
                }
            }
        },
        {
            "guid": "52d4e1bd77c84ec790991cf8e87d2ebc",
            "name": "LuckyLockpick",
            "display": "Lucky Lockpick",
            "details": "A chance to not die, and no chance to break",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 1300,
            "extra": "Combined from Lockpick & Lucky Charm",
            "tables": {}
        },
        {
            "guid": "7b5f646318f3454dacb28fc75eb8c0f2",
            "name": "Inverter",
            "display": "Inverter",
            "details": "Lost curses become blessings",
            "rarity": "Rare",
            "crafting": 25,
            "cost": 475,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 69,
                    "weight": 2
                },
                "relicAll": {
                    "index": 101,
                    "weight": 2
                }
            }
        },
        {
            "guid": "82b826e6d3044504bfa46c4caa6f1b0b",
            "name": "Recycler",
            "display": "Recycler",
            "details": "Destroy empty chests for items",
            "rarity": "20",
            "crafting": 20,
            "cost": 375,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 83,
                    "weight": 9
                },
                "relicAll": {
                    "index": 47,
                    "weight": 9
                },
                "relicShop": {
                    "index": 35,
                    "weight": 9
                }
            }
        },
        {
            "guid": "0682d92aff14474d895c2e91f8826f25",
            "name": "FanOfKnives",
            "display": "Fan of Knives",
            "details": "Release a spray of daggers when you throw",
            "rarity": "Common",
            "crafting": 16,
            "cost": 500,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 70,
                    "weight": 9
                },
                "relicAll": {
                    "index": 90,
                    "weight": 9
                }
            }
        },
        {
            "guid": "f5e0082e84c74286829fa52bf633cbeb",
            "name": "KurtzStache",
            "display": "Kurtz' Stache",
            "details": "tablesA mysterious box that invites calamity",
            "rarity": "Common",
            "crafting": "-",
            "cost": 200,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 66,
                    "weight": 9
                },
                "relicAll": {
                    "index": 60,
                    "weight": 9
                },
                "relicShop": {
                    "index": 25,
                    "weight": 9
                }
            }
        },
        {
            "guid": "b7a8798a25ca4137a95538358085f2f4",
            "name": "GlassCannon",
            "display": "Glass Cannon",
            "details": "Increases damage, but decreases maximum health",
            "rarity": "Legendary",
            "crafting": "-",
            "cost": 775,
            "extra": "",
            "tables": {
                "relicLegendary": {
                    "index": 10,
                    "weight": 1
                }
            }
        },
        {
            "guid": "2e8dd836a09f4e47b57e23b4d00f16ec",
            "name": "SoulCannon",
            "display": "Soul Cannon",
            "details": "Fire a projectile while swinging",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 550,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 98,
                    "weight": 3
                },
                "relicAll": {
                    "index": 109,
                    "weight": 3
                },
                "relicFinal": {
                    "index": 29,
                    "weight": 3
                }
            }
        },
        {
            "guid": "ecc0480e43924477ad68b3e9beb631b3",
            "name": "Ara",
            "display": "Ara",
            "details": "Consumes a future curse after praying",
            "rarity": "Common",
            "crafting": 26,
            "cost": 425,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 105,
                    "weight": 9
                },
                "relicAll": {
                    "index": 116,
                    "weight": 9
                },
                "relicShop": {
                    "index": 48,
                    "weight": 9
                }
            }
        },
        {
            "guid": "6ca902940c004d7c957fe367f77e7337",
            "name": "UrsaMajor",
            "display": "Ursa Major",
            "details": "Increases max health after eating food",
            "rarity": "Common",
            "crafting": "-",
            "cost": 400,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 106,
                    "weight": 9
                },
                "relicAll": {
                    "index": 117,
                    "weight": 9
                }
            }
        },
        {
            "guid": "4ca66dcd2df34cbcbef82e2c5cafd5fc",
            "name": "CanisMajor",
            "display": "Canis Major",
            "details": "Crits temporarily increase crit chance",
            "rarity": "Common",
            "crafting": "-",
            "cost": 300,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 107,
                    "weight": 9
                },
                "relicAll": {
                    "index": 118,
                    "weight": 9
                },
                "relicFinal": {
                    "index": 31,
                    "weight": 9
                }
            }
        },
        {
            "guid": "993daf5814304f9da36d0080fe4b9cbc",
            "name": "Sagitta",
            "display": "Sagitta",
            "details": "Enemies explode in arrows after a critical strike",
            "rarity": "Common",
            "crafting": "-",
            "cost": 325,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 108,
                    "weight": 9
                },
                "relicAll": {
                    "index": 119,
                    "weight": 9
                }
            }
        },
        {
            "guid": "7aedab48d5ca4e5b8d9f33a292ef38ef",
            "name": "Circinus",
            "display": "Circinus",
            "details": "Temporarily reveals secret rooms, secret rooms can have secret rooms",
            "rarity": "Common",
            "crafting": "-",
            "cost": 380,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 109,
                    "weight": 9
                },
                "relicAll": {
                    "index": 120,
                    "weight": 9
                },
                "relicShop": {
                    "index": 49,
                    "weight": 9
                }
            }
        },
        {
            "guid": "1981b4af04434077afafc78691056387",
            "name": "CursedAegis",
            "display": "Siegfried's Aegis",
            "details": "Inflicts pain on the bearer",
            "rarity": "Common",
            "crafting": "-",
            "cost": 1,
            "extra": "",
            "tables": {}
        },
        {
            "guid": "a6587dfd53e54a20ab1a167bc2b40e4a",
            "name": "PaladinShield",
            "display": "Paladin Shield",
            "details": "Siegfried's shield, rid of its agonizing curse. Purified by a nameless wanderer. His legacy redeemed.",
            "rarity": "Rare",
            "crafting": 1,
            "cost": 1000,
            "extra": "",
            "tables": {
                "relic": {
                    "index": 96,
                    "weight": 2
                },
                "relicAll": {
                    "index": 51,
                    "weight": 2
                },
                "relicFinal": {
                    "index": 28,
                    "weight": 6
                }
            }
        },
        {
            "guid": "1981b4af04434077afafc78691056387",
            "name": "HotCrossBun",
            "display": "Hot Cross Bun",
            "details": "Increases maximum health, very slightly",
            "rarity": "Common",
            "crafting": "-",
            "cost": 5,
            "extra": "",
            "tables": {}
        },
        {
            "guid": "898d87f98b184697ac89672f9bf955e4",
            "name": "CreditCardSilver",
            "display": "Pilfer Credit Card Silver",
            "details": "A Gold10.png 2,500 limit at 0% interest",
            "rarity": "Common",
            "crafting": "-",
            "cost": 1,
            "extra": "",
            "tables": {
                "relicShop": {
                    "index": 40,
                    "weight": 2
                }
            }
        }
    ],
    "potion": [
        {
            "guid": "f3c6fcf6f86a44178c4649f71fb5d18f",
            "name": "TincturePotion",
            "display": "Tincture",
            "details": "Recovers health",
            "rarity": "Common",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 1,
                    "weight": 9
                },
                "potionShop": {
                    "index": 1,
                    "weight": 10
                },
                "potionDibble": {
                    "index": 1,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 0,
                    "weight": 9
                }
            }
        },
        {
            "guid": "27b4611c53e04c0a9d771b76d47d7deb",
            "name": "ApprenticesTincturePotion",
            "display": "Apprentice's Tincture",
            "details": "Recovers a random amount of health",
            "rarity": "Common",
            "crafting": 12,
            "cost": 130,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 24,
                    "weight": 9
                },
                "potionShop": {
                    "index": 18,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 18,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 5,
                    "weight": 9
                }
            }
        },
        {
            "guid": "cea67360abf84347a264ef64ed806e58",
            "name": "SalvagingSludgePotion",
            "display": "Salvaging Sludge",
            "details": "Recover health for each carried curse",
            "rarity": "Common",
            "crafting": 18,
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 54,
                    "weight": 9
                },
                "potionShop": {
                    "index": 38,
                    "weight": 9
                }
            }
        },
        {
            "guid": "bfe7c47be6fc4bdbb86e364a6b1cf076",
            "name": "RegenPotion",
            "display": "Troll Sweat",
            "details": "Regenerate health over time",
            "rarity": "Common",
            "crafting": "-",
            "cost": 200,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 2,
                    "weight": 7
                },
                "potionShop": {
                    "index": 2,
                    "weight": 7
                },
                "potionDibble": {
                    "index": 2,
                    "weight": 7
                },
                "potionFinal": {
                    "index": 1,
                    "weight": 7
                }
            }
        },
        {
            "guid": "d2c408e370584302b135fc159d6b0b25",
            "name": "GhostlyIchorPotion",
            "display": "Ghostly Ichor",
            "details": "Heal over time for each curse",
            "rarity": "Common",
            "crafting": 18,
            "cost": 200,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 41,
                    "weight": 9
                },
                "potionShop": {
                    "index": 28,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 31,
                    "weight": 9
                }
            }
        },
        {
            "guid": "db3a699d040b4fd6a4a64399f1275d61",
            "name": "CureAllPotion",
            "display": "Cure All",
            "details": "Create a circle of healing",
            "rarity": "Rare",
            "crafting": 30,
            "cost": 100,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 40,
                    "weight": 2
                },
                "potionShop": {
                    "index": 27,
                    "weight": 2
                },
                "potionDibble": {
                    "index": 30,
                    "weight": 2
                }
            }
        },
        {
            "guid": "a3f7691e471243ed899c52b5ae1bc2de",
            "name": "CoffeePotion",
            "display": "Coffee",
            "details": "Recover health proportional to missing health",
            "rarity": "Common",
            "crafting": 10,
            "cost": 160,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 45,
                    "weight": 9
                },
                "potionShop": {
                    "index": 30,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 33,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 12,
                    "weight": 9
                }
            }
        },
        {
            "guid": "f84e9f7aa7b04c648a08c6b75eebaf2e",
            "name": "ElixirPotion",
            "display": "Elixir",
            "details": "Restores all missing health",
            "rarity": "Rare",
            "crafting": 38,
            "cost": 300,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 22,
                    "weight": 3
                },
                "potionShop": {
                    "index": 16,
                    "weight": 3
                },
                "potionDibble": {
                    "index": 17,
                    "weight": 3
                },
                "potionFinal": {
                    "index": 4,
                    "weight": 3
                }
            }
        },
        {
            "guid": "27497c3cdd91494ba066eb45ee59d528",
            "name": "PartyPopcornPotion",
            "display": "Rainbow Kernels",
            "details": "Duplicate almost everything in the room",
            "rarity": "Rare",
            "crafting": 44,
            "cost": 500,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 18,
                    "weight": 1
                }
            }
        },
        {
            "guid": "0455a3d8711146e3a479e71d4d37954b",
            "name": "GoldPopcornPotion",
            "display": "Golden Kernels",
            "details": "Duplicate all gold in the room",
            "rarity": "Common",
            "crafting": 16,
            "cost": 100,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 16,
                    "weight": 2
                },
                "potionShop": {
                    "index": 12,
                    "weight": 2
                },
                "potionDibble": {
                    "index": 14,
                    "weight": 3
                }
            }
        },
        {
            "guid": "dc421ae2fb974a01b8cc4b2a9093244e",
            "name": "ItemPopcornPotion",
            "display": "Popcorn Kernels",
            "details": "Duplicate all basic items in the room",
            "rarity": "Common",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 17,
                    "weight": 7
                },
                "potionShop": {
                    "index": 13,
                    "weight": 5
                }
            }
        },
        {
            "guid": "908bacbc988a46559da7ef9f4fe8e042",
            "name": "FoodPopcornPotion",
            "display": "Seasoned Kernels",
            "details": "Duplicate all food in the room",
            "rarity": "Common",
            "crafting": 15,
            "cost": 110,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 15,
                    "weight": 7
                },
                "potionShop": {
                    "index": 11,
                    "weight": 5
                },
                "potionDibble": {
                    "index": 13,
                    "weight": 9
                }
            }
        },
        {
            "guid": "5638e38a67e04f4eaec6473d5042890f",
            "name": "WhiplashPotion",
            "display": "Whiplash Serum",
            "details": "Temporarily increases throw damage",
            "rarity": "Common",
            "crafting": "-",
            "cost": 175,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 26,
                    "weight": 9
                },
                "potionShop": {
                    "index": 50,
                    "weight": 6
                },
                "potionDibble": {
                    "index": 20,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 6,
                    "weight": 9
                }
            }
        },
        {
            "guid": "fb789e8f36a349f1a71ceb2e9c1e3f46",
            "name": "StrengthPotion",
            "display": "Strength Serum",
            "details": "Temporarily increases swing damage",
            "rarity": "Common",
            "crafting": "-",
            "cost": 175,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 27,
                    "weight": 9
                },
                "potionShop": {
                    "index": 47,
                    "weight": 6
                },
                "potionDibble": {
                    "index": 21,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 7,
                    "weight": 9
                }
            }
        },
        {
            "guid": "5178abb3de614cb59411b8144fd2dc32",
            "name": "SavagryPotion",
            "display": "Savagery Serum",
            "details": "Temporarily increases critical chance",
            "rarity": "Common",
            "crafting": "-",
            "cost": 175,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 28,
                    "weight": 9
                },
                "potionShop": {
                    "index": 46,
                    "weight": 6
                },
                "potionDibble": {
                    "index": 22,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 8,
                    "weight": 9
                }
            }
        },
        {
            "guid": "00772a2e1a7d4755a76e8183b1d6b0ce",
            "name": "AlacrityPotion",
            "display": "Alacrity Serum",
            "details": "Temporarily increases attack speed",
            "rarity": "Common",
            "crafting": "-",
            "cost": 175,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 29,
                    "weight": 9
                },
                "potionShop": {
                    "index": 42,
                    "weight": 6
                },
                "potionDibble": {
                    "index": 23,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 9,
                    "weight": 9
                }
            }
        },
        {
            "guid": "44cd9c54d22c4ab289b5edf7b4fe40f4",
            "name": "CleaveSerumPotion",
            "display": "Sundering Serum",
            "details": "Temporarily increases swing size",
            "rarity": "Common",
            "crafting": "-",
            "cost": 200,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 50,
                    "weight": 9
                },
                "potionShop": {
                    "index": 34,
                    "weight": 6
                },
                "potionDibble": {
                    "index": 34,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 13,
                    "weight": 9
                }
            }
        },
        {
            "guid": "fe0fbfc6bceb4a2f91ea280ba82f7d38",
            "name": "GustSerumPotion",
            "display": "Cyclonic Serum",
            "details": "Temporarily increases throw size",
            "rarity": "Common",
            "crafting": "-",
            "cost": 200,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 51,
                    "weight": 9
                },
                "potionShop": {
                    "index": 35,
                    "weight": 6
                },
                "potionDibble": {
                    "index": 35,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 14,
                    "weight": 9
                }
            }
        },
        {
            "guid": "617b7758377d4230a24823645d3898f4",
            "name": "HealthSerumPotion",
            "display": "Durability Serum",
            "details": "",
            "rarity": "Common",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 52,
                    "weight": 9
                },
                "potionShop": {
                    "index": 36,
                    "weight": 6
                },
                "potionDibble": {
                    "index": 36,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 15,
                    "weight": 9
                }
            }
        },
        {
            "guid": "df251e38396f44119823faa3840db809",
            "name": "DecursePotion",
            "display": "Holy Water",
            "details": "Remove a curse",
            "rarity": "Common",
            "crafting": "-",
            "cost": 325,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 14,
                    "weight": 9
                },
                "potionShop": {
                    "index": 10,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 12,
                    "weight": 9
                }
            }
        },
        {
            "guid": "e99410fecfac4015b5504ec3b87b5cd0",
            "name": "PurgePotion",
            "display": "Purge Potion",
            "details": "Removes a curse and deals 75 damage.",
            "rarity": "Common",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 35,
                    "weight": 9
                },
                "potionShop": {
                    "index": 21,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 27,
                    "weight": 9
                }
            }
        },
        {
            "guid": "2d9d51a29ebe40a99d37445de1954951",
            "name": "PurificationPotion",
            "display": "Purification Potion",
            "details": "Removes all curses, bombs, keys, and sets health to 1",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 1000,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 39,
                    "weight": 1
                },
                "potionShop": {
                    "index": 26,
                    "weight": 1
                }
            }
        },
        {
            "guid": "7ca4f0f6567c4b348fd6ccae072dbded",
            "name": "Aether",
            "display": "Aether",
            "details": "Remove a specific curse",
            "rarity": "Common",
            "crafting": 80,
            "cost": 600,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 49,
                    "weight": 2
                },
                "potionShop": {
                    "index": 33,
                    "weight": 2
                }
            }
        },
        {
            "guid": "28737e052b414273a67aca33267fc2e7",
            "name": "Absolution",
            "display": "Absolution",
            "details": "If you have exactly 5 curses, removes 5 curses",
            "rarity": "Common",
            "crafting": "-",
            "cost": 800,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 38,
                    "weight": 2
                },
                "potionShop": {
                    "index": 25,
                    "weight": 2
                },
                "potionDibble": {
                    "index": 29,
                    "weight": 2
                }
            }
        },
        {
            "guid": "b0dd99d6f5184fb49df441af4bf298a5",
            "name": "BombDoublingPotion",
            "display": "Doubling Saison",
            "details": "Double your bombs",
            "rarity": "Common",
            "crafting": "-",
            "cost": 220,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 13,
                    "weight": 3
                },
                "potionShop": {
                    "index": 9,
                    "weight": 3
                },
                "potionDibble": {
                    "index": 11,
                    "weight": 3
                }
            }
        },
        {
            "guid": "f34771cdd3514f379f42355fb1b4a41d",
            "name": "SwapPotion",
            "display": "Impish Key Bomb",
            "details": "Swap your items around",
            "rarity": "Common",
            "crafting": "-",
            "cost": 240,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 9,
                    "weight": 9
                },
                "potionShop": {
                    "index": 6,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 7,
                    "weight": 9
                }
            }
        },
        {
            "guid": "20d260544d224607b1f2363d06def2a0",
            "name": "IronGlazePotion",
            "display": "Iron Glaze",
            "details": "Average the number of held keys and bombs",
            "rarity": "Rare",
            "crafting": 10,
            "cost": 175,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 47,
                    "weight": 9
                },
                "potionShop": {
                    "index": 32,
                    "weight": 9
                }
            }
        },
        {
            "guid": "2caf27e525fa4787bd629282ef202094",
            "name": "HolyGlaze",
            "display": "Holy Glaze",
            "details": "Average the levels of all blessings",
            "rarity": "Common",
            "crafting": 20,
            "cost": 275,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 58,
                    "weight": 9
                },
                "potionShop": {
                    "index": 41,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 37,
                    "weight": 9
                }
            }
        },
        {
            "guid": "15ca0afa442849328a5a8ff6411b301a",
            "name": "AmbrosiaPotion",
            "display": "Ambrosia",
            "details": "Double the level of a random blessing",
            "rarity": "Rare",
            "crafting": 38,
            "cost": 375,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 57,
                    "weight": 3
                },
                "potionShop": {
                    "index": 40,
                    "weight": 3
                }
            }
        },
        {
            "guid": "87304ff317824d638d8c2a591b5ce37b",
            "name": "NitroglycerinPotion",
            "display": "Nitroglycerin",
            "details": "Drop bombs continuously",
            "rarity": "Common",
            "crafting": "-",
            "cost": 220,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 12,
                    "weight": 9
                },
                "potionShop": {
                    "index": 8,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 10,
                    "weight": 9
                }
            }
        },
        {
            "guid": "1c0df4b6c9f2494c8eb2376ec97ca4fb",
            "name": "AuglycerinPotion",
            "display": "Auglycerin",
            "details": "Drop gold continuously",
            "rarity": "Common",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 19,
                    "weight": 9
                },
                "potionShop": {
                    "index": 43,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 15,
                    "weight": 9
                }
            }
        },
        {
            "guid": "4673c7f91a7b4d35b8ebe30a16ce650a",
            "name": "ImmolatePotion",
            "display": "Immolation Potion",
            "details": "Burns nearby enemies",
            "rarity": "Common",
            "crafting": 10,
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 11,
                    "weight": 9
                },
                "potionShop": {
                    "index": 52,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 9,
                    "weight": 9
                }
            }
        },
        {
            "guid": "d42df1015fa04546bfd1cc0958cfc34b",
            "name": "FloatPotion",
            "display": "Float Potion",
            "details": "Avoid falling into holes",
            "rarity": "Common",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 10,
                    "weight": 9
                },
                "potionShop": {
                    "index": 7,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 8,
                    "weight": 9
                }
            }
        },
        {
            "guid": "b994f67a8e3f44578e1899cd043e3997",
            "name": "SeltsBlood",
            "display": "Selt's Blood",
            "details": "Spawn larvae",
            "rarity": "Rare",
            "crafting": 10,
            "cost": 220,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 33,
                    "weight": 3
                },
                "potionShop": {
                    "index": 53,
                    "weight": 3
                },
                "potionDibble": {
                    "index": 26,
                    "weight": 3
                }
            }
        },
        {
            "guid": "0b736c7fe4974e65a08cd5c0ab189929",
            "name": "BloodChalice",
            "display": "Blood Chalice",
            "details": "Consumes 25% health, drops items and sometimes another blood chalice.",
            "rarity": "Rare",
            "crafting": 50,
            "cost": 290,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 37,
                    "weight": 3
                },
                "potionShop": {
                    "index": 24,
                    "weight": 3
                }
            }
        },
        {
            "guid": "12784fa0c4a949fdadf21288bc5ec170",
            "name": "FireballPotion",
            "display": "Fury Potion",
            "details": "Fire some fireballs",
            "rarity": "Common",
            "crafting": "-",
            "cost": 100,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 8,
                    "weight": 9
                },
                "potionShop": {
                    "index": 44,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 6,
                    "weight": 9
                }
            }
        },
        {
            "guid": "5f8cb66127e74d0baff7a1ba5b4cf972",
            "name": "ReverseDamagePotion",
            "display": "Antimatter",
            "details": "The next time you would take damage, gain that much health instead",
            "rarity": "Common",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 7,
                    "weight": 9
                },
                "potionShop": {
                    "index": 5,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 5,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 3,
                    "weight": 9
                }
            }
        },
        {
            "guid": "05572761ed6d4d4f91203cd46f890adf",
            "name": "PickledPilferPotion",
            "display": "Bottled Pilfer",
            "details": "Releases a Hoarding Pilfer",
            "rarity": "Rare",
            "crafting": 22,
            "cost": 500,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 6,
                    "weight": 3
                },
                "potionShop": {
                    "index": 4,
                    "weight": 3
                }
            }
        },
        {
            "guid": "bcfda0149d944afcb246305be2695172",
            "name": "ShopPotion",
            "display": "Shop in a Bottle",
            "details": "Discover the secret shop",
            "rarity": "Common",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 4,
                    "weight": 3
                },
                "potionShop": {
                    "index": 22,
                    "weight": 3
                }
            }
        },
        {
            "guid": "f83096ef1b674f6c832dec65a4a3d758",
            "name": "PotionPotion",
            "display": "Bottles in a Bottle",
            "details": "Drop two potions",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 300,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 48,
                    "weight": 3
                },
                "potionShop": {
                    "index": 45,
                    "weight": 3
                }
            }
        },
        {
            "guid": "15c7f082e7454fc38695e6152782bbf9",
            "name": "ChestInABottle",
            "display": "Chest in a Bottle",
            "details": "Drop a random chest",
            "rarity": "Common",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 20,
                    "weight": 9
                },
                "potionShop": {
                    "index": 14,
                    "weight": 9
                }
            }
        },
        {
            "guid": "cda68d3762ef4aa6bc5b00e2f8eeec6d",
            "name": "TransmuterInABottle",
            "display": "TRANSMUT3 in a Bottle",
            "details": "Add a TRANSMUT3 to the room",
            "rarity": "Common",
            "crafting": 26,
            "cost": 300,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 34,
                    "weight": 9
                }
            }
        },
        {
            "guid": "f05bebbd21e04c468299c7763704f332",
            "name": "AltarInABottle",
            "display": "Altar in a Bottle",
            "details": "Spawn an altar",
            "rarity": "Common",
            "crafting": 35,
            "cost": 200,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 46,
                    "weight": 9
                },
                "potionShop": {
                    "index": 31,
                    "weight": 9
                }
            }
        },
        {
            "guid": "6da20a3b58c3488c8b764ae90689cb04",
            "name": "DopplePotion",
            "display": "Doppelbock",
            "details": "Summon a doppelganger to work alongside you",
            "rarity": "Common",
            "crafting": "-",
            "cost": 300,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 66,
                    "weight": 9
                },
                "potionShop": {
                    "index": 58,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 41,
                    "weight": 1
                },
                "potionFinal": {
                    "index": 19,
                    "weight": 9
                }
            }
        },
        {
            "guid": "b12beb42d1b549e392b00d00a01520c9",
            "name": "Transmutagen",
            "display": "Transmutagen",
            "details": "Transforms all relics in the room",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 5,
                    "weight": 3
                },
                "potionShop": {
                    "index": 3,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 4,
                    "weight": 3
                }
            }
        },
        {
            "guid": "a72e7b460e8649b08298d8c4bf15f349",
            "name": "SwapRelicPotion",
            "display": "Metamorphim",
            "details": "Transmute a carried relic",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 500,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 23,
                    "weight": 2
                }
            }
        },
        {
            "guid": "06eea0e248e74a249d1fe9b3c92d0b70",
            "name": "SwapAllRelicPotion",
            "display": "Mighty Metamorphim",
            "details": "Transmute all carried relics",
            "rarity": "Rare",
            "crafting": 50,
            "cost": 1000,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 30,
                    "weight": 3
                },
                "potionShop": {
                    "index": 17,
                    "weight": 3
                },
                "potionDibble": {
                    "index": 24,
                    "weight": 3
                }
            }
        },
        {
            "guid": "8a91e7875f294cb280f34898b5594f2d",
            "name": "CircleTransmutePotion",
            "display": "Circle of Transmutation",
            "details": "Transmutes items in a small circle, but makes them fragile",
            "rarity": "Rare",
            "crafting": 85,
            "cost": 360,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 55,
                    "weight": 3
                },
                "potionShop": {
                    "index": 51,
                    "weight": 3
                }
            }
        },
        {
            "guid": "200012b4fdb74289b228f292193cf146",
            "name": "UnholyStrengthPotion",
            "display": "Berserker's Brew",
            "details": "Deal and take more damage",
            "rarity": "Common",
            "crafting": "-",
            "cost": 175,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 3,
                    "weight": 9
                },
                "potionShop": {
                    "index": 49,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 3,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 2,
                    "weight": 9
                }
            }
        },
        {
            "guid": "b9c7849437254fcbbe60ab61143f1de5",
            "name": "GhostPepperSauce",
            "display": "Ghost Pepper Sauce",
            "details": "Become immune to fire damage and ignite yourself",
            "rarity": "Common",
            "crafting": 15,
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 43,
                    "weight": 9
                },
                "potionShop": {
                    "index": 29,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 32,
                    "weight": 9
                }
            }
        },
        {
            "guid": "2849e0d8002e4800936de05abbde0ed7",
            "name": "ToadvinesTonic",
            "display": "Toadvine's Tonic",
            "details": "Become immune to poison, if you can survive it",
            "rarity": "Common",
            "crafting": 15,
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 65,
                    "weight": 9
                },
                "potionShop": {
                    "index": 57,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 40,
                    "weight": 1
                }
            }
        },
        {
            "guid": "9c0401cc3c9a4188a6b3c800215b557d",
            "name": "NumbingCream",
            "display": "Numbing Cream",
            "details": "Reduce incoming damage",
            "rarity": "Rare",
            "crafting": 26,
            "cost": 375,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 53,
                    "weight": 3
                },
                "potionShop": {
                    "index": 37,
                    "weight": 3
                },
                "potionFinal": {
                    "index": 16,
                    "weight": 3
                }
            }
        },
        {
            "guid": "e50bae2f580c4159a881f6c7852ca586",
            "name": "EagleEyePotion",
            "display": "Potion of True Sight",
            "details": "Discover nearby secrets",
            "rarity": "Common",
            "crafting": 8,
            "cost": 140,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 0,
                    "weight": 9
                },
                "potionShop": {
                    "index": 0,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 0,
                    "weight": 9
                }
            }
        },
        {
            "guid": "8372b8d3152445afa410b7bb9dbd45a8",
            "name": "PotionofPlenty",
            "display": "Potion of Plenty",
            "details": "Drop some useful things",
            "rarity": "Common",
            "crafting": "-",
            "cost": 210,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 21,
                    "weight": 9
                },
                "potionShop": {
                    "index": 15,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 16,
                    "weight": 9
                }
            }
        },
        {
            "guid": "84e344cdca10420a9db29efbd3d1dc72",
            "name": "ProteinPotion",
            "display": "Protein Shake",
            "details": "Drop some protein",
            "rarity": "Common",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 32,
                    "weight": 9
                },
                "potionShop": {
                    "index": 20,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 25,
                    "weight": 9
                },
                "potionFinal": {
                    "index": 10,
                    "weight": 9
                }
            }
        },
        {
            "guid": "a716c2ee1f634d74af7cc84ff341d374",
            "name": "BlessedBlend",
            "display": "Blessed Blend",
            "details": "Drops a blessing",
            "rarity": "Common",
            "crafting": 16,
            "cost": 275,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 42,
                    "weight": 7
                },
                "potionFinal": {
                    "index": 11,
                    "weight": 7
                }
            }
        },
        {
            "guid": "4bbe9f7680b34a17a1ca6dfc90c725e7",
            "name": "ToxinPotion",
            "display": "Toxin",
            "details": "Coat your weapon with poison",
            "rarity": "Common",
            "crafting": "-",
            "cost": 175,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 25,
                    "weight": 9
                },
                "potionShop": {
                    "index": 48,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 19,
                    "weight": 9
                }
            }
        },
        {
            "guid": "c0a32814b2e24d15a63664bcdc949d26",
            "name": "WitchsBrew",
            "display": "Witch's Brew",
            "details": "Become cursed",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 500,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 64,
                    "weight": 0
                }
            }
        },
        {
            "guid": "145bde979116479fabc648bebf584e32",
            "name": "FreeloaderPotion",
            "display": "Freeloader Draught",
            "details": "Get something for nothing",
            "rarity": "Rare",
            "crafting": "-",
            "cost": 400,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 31,
                    "weight": 2
                },
                "potionShop": {
                    "index": 19,
                    "weight": 2
                }
            }
        },
        {
            "guid": "6a41bdb034dd45549825a7b4f9198362",
            "name": "BiscuitsPotion",
            "display": "Biscuits",
            "details": "Increse experience gain for a familiar.",
            "rarity": "Common",
            "crafting": "-",
            "cost": 300,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 36,
                    "weight": 9
                },
                "potionShop": {
                    "index": 23,
                    "weight": 9
                },
                "potionDibble": {
                    "index": 28,
                    "weight": 9
                }
            }
        },
        {
            "guid": "17392f3e7d05485a800ddcd201bfb98c",
            "name": "MidasTouchPotion",
            "display": "Midas Touch",
            "details": "All enemies are turned to gold",
            "rarity": "Rare",
            "crafting": 20,
            "cost": 375,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 44,
                    "weight": 3
                }
            }
        },
        {
            "guid": "4f9154518bfe4a0ebd09e57aef8ebdf9",
            "name": "KissSuccubusPotion",
            "display": "Kiss of the Succubus",
            "details": "Kill all enemies and steal their health",
            "rarity": "Rare",
            "crafting": 20,
            "cost": 450,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 56,
                    "weight": 3
                },
                "potionShop": {
                    "index": 39,
                    "weight": 3
                }
            }
        },
        {
            "guid": "5829b0cc3f6149da9649aa302cf7ca57",
            "name": "AllPotion",
            "display": "All-Potion",
            "details": "Is whatever you need it to be",
            "rarity": "Rare",
            "crafting": 99,
            "cost": 500,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 59,
                    "weight": 2
                }
            }
        },
        {
            "guid": "ee6c6499fedf45d891ce5c3ee09b2da3",
            "name": "SomePotion",
            "display": "Some-Potion",
            "details": "Is whatever you need it to be, sometimes",
            "rarity": "Rare",
            "crafting": 98,
            "cost": 400,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 60,
                    "weight": 3
                }
            }
        },
        {
            "guid": "1cfe53e981a24b7cbbad91669f5ac52e",
            "name": "StarlightSip",
            "display": "Starlight Sip",
            "details": "Pull the heavens down onto your foes",
            "rarity": "Common",
            "crafting": 28,
            "cost": 500,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 61,
                    "weight": 6
                },
                "potionShop": {
                    "index": 54,
                    "weight": 3
                },
                "potionDibble": {
                    "index": 38,
                    "weight": 3
                },
                "potionFinal": {
                    "index": 17,
                    "weight": 6
                }
            }
        },
        {
            "guid": "43f16c0b6aa94743a87c235025a7f98d",
            "name": "ChurchbellNectarPotion",
            "display": "Churchbell Nectar",
            "details": "Creates a temporary Churchbell shield",
            "rarity": "Common",
            "crafting": 16,
            "cost": 300,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 62,
                    "weight": 9
                },
                "potionShop": {
                    "index": 55,
                    "weight": 6
                },
                "potionDibble": {
                    "index": 39,
                    "weight": 6
                },
                "potionFinal": {
                    "index": 18,
                    "weight": 9
                }
            }
        },
        {
            "guid": "4c8d7e3454124c4aab32c45bf05edc8b",
            "name": "PangolinPotion",
            "display": "Pangolin Potion",
            "details": "Refills four armor points",
            "rarity": "Common",
            "crafting": "-",
            "cost": 450,
            "extra": "",
            "tables": {
                "potion": {
                    "index": 63,
                    "weight": 6
                },
                "potionShop": {
                    "index": 56,
                    "weight": 6
                }
            }
        }
    ],
    "item": [
        {
            "guid": "8d0acbcdb33a46a9bfa9c623e8be72e6",
            "name": "Bomb",
            "display": "Bomb",
            "details": "Deals damage and destroys rocks, as well as other objects",
            "rarity": "Common",
            "crafting": "-",
            "cost": 50,
            "extra": "",
            "tables": {
                "item": {
                    "index": 0,
                    "weight": 20
                },
                "itemShop": {
                    "index": 0,
                    "weight": 20
                },
                "itemDibble": {
                    "index": 0,
                    "weight": 9
                }
            }
        },
        {
            "guid": "0f53c763ed3b4c77bceaa4853f95ead0",
            "name": "BombBag",
            "display": "Bag O' Bombs",
            "details": "Full of bombs",
            "rarity": "Common",
            "crafting": "-",
            "cost": 150,
            "extra": "",
            "tables": {
                "item": {
                    "index": 3,
                    "weight": 2
                },
                "itemShop": {
                    "index": 3,
                    "weight": 2
                },
                "itemDibble": {
                    "index": 2,
                    "weight": 1
                }
            }
        },
        {
            "guid": "c82f660a0fbd4eb983e98d5896253e09",
            "name": "Key",
            "display": "Key",
            "details": "Unlocks chests, doors and other locked objects",
            "rarity": "Common",
            "crafting": "",
            "cost": 120,
            "extra": "",
            "tables": {
                "item": {
                    "index": 1,
                    "weight": 15
                },
                "itemShop": {
                    "index": 1,
                    "weight": 15
                },
                "itemDibble": {
                    "index": 1,
                    "weight": 9
                }
            }
        },
        {
            "guid": "32d2db84cca547699565e949c6815f06",
            "name": "KeyRing",
            "display": "Key Ring",
            "details": "Full of keys",
            "rarity": "Common",
            "crafting": "",
            "cost": 240,
            "extra": "",
            "tables": {
                "item": {
                    "index": 4,
                    "weight": 1
                },
                "itemShop": {
                    "index": 4,
                    "weight": 1
                },
                "itemDibble": {
                    "index": 3,
                    "weight": 1
                }
            }
        },
        {
            "guid": "dd61c0367bbf41f9bb86a85c1e7b0aae",
            "name": "Talisman",
            "display": "Talisman",
            "details": "Removes a curse",
            "rarity": "Common",
            "crafting": "",
            "cost": 300,
            "extra": "",
            "tables": {
                "item": {
                    "index": 2,
                    "weight": 4
                },
                "itemShop": {
                    "index": 2,
                    "weight": 4
                }
            }
        }
    ],
    "food": [
        {
            "guid": "3771da94280f49959634ebc9bc7098a4",
            "name": "HealthS",
            "display": "Medium Rare Steak",
            "details": "Restores a small amount of health",
            "rarity": "Common",
            "crafting": "",
            "cost": 50,
            "extra": "",
            "tables": {
                "food": {
                    "index": 0,
                    "weight": 15
                }
            }
        },
        {
            "guid": "5d1d5865fd7b4353b3b43fe0d81b7960",
            "name": "HealthM",
            "display": "Fish Kebab",
            "details": "Restores a moderate amount of health",
            "rarity": "Common",
            "crafting": "",
            "cost": 200,
            "extra": "",
            "tables": {
                "food": {
                    "index": 1,
                    "weight": 4
                }
            }
        },
        {
            "guid": "e218308da36941de8705ba950e0455f3",
            "name": "HealthL",
            "display": "Ham Shank",
            "details": "Restores a large amount of health",
            "rarity": "Common",
            "crafting": "",
            "cost": 300,
            "extra": "",
            "tables": {
                "food": {
                    "index": 2,
                    "weight": 1
                }
            }
        },
        {
            "guid": "c0ee06997e624cd88c68171930159fa1",
            "name": "ArmorShard",
            "display": "Armor Shard",
            "details": "Refills a point of armor",
            "rarity": "Common",
            "crafting": "",
            "cost": 150,
            "extra": "",
            "tables": {
                "food": {
                    "index": 3,
                    "weight": 5
                }
            }
        }
    ],
    "weightedTables": [
        {
            "key": "itemDibble",
            "type": "item",
            "randState": "dibble",
            "tables": {
                "dibble": {
                    "index": 0,
                    "weight": 5,
                },
                "dibbleRelic": {
                    "index": 0,
                    "weight": 5
                }
            }
        },
        {
            "key": "potionDibble",
            "type": "potion",
            "randState": "dibble",
            "tables": {
                "dibble": {
                    "index": 1,
                    "weight": 2
                },
                "dibbleRelic": {
                    "index": 1,
                    "weight": 2
                }
            }
        },
        {
            "key": "relic",
            "type": "relic",
            "randState": "relic",
            "tables": {
                "dibbleRelic": {
                    "index": 2,
                    "weight": 1
                }
            }
        },
        {
            "key": "potionShop",
            "type": "potion",
            "randState": "shopPotion",
            "tables": {
                "potionOrRelic": {
                    "index": 0,
                    "weight": 3
                }
            }
        },
        {
            "key": "relicShop",
            "type": "relic",
            "randState": "shopRelic",
            "tables": {
                "potionOrRelic": {
                    "index": 1,
                    "weight": 1
                }
            }
        }
    ]
});
const mine51 = Object.freeze([
    [
        {
            "type": ["Mine_Room_Small"],
            "tag": "begin",
            "chance": 1,
            "branchWeight": 1
        },
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "normal_encounters",
            "chance": 1,
            "branchWeight": 4
        },
        {
            "type": ["Mine_Room_Large"],
            "tag": "normal_encounters",
            "chance": 1,
            "branchWeight": 4
        },
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "normal_encounters",
            "chance": 1,
            "branchWeight": 4
        },
        {
            "type": ["Mine_Room_Large"],
            "tag": "normal_encounters",
            "chance": 1,
            "branchWeight": 4
        },
        {
            "type": ["Mine_Room_Small"],
            "tag": "end",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small"],
            "tag": "relic_encounters_unlocked",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small"],
            "tag": "black_rabbit_first",
            "chance": 1,
            "branchWeight": 1,
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "treasure_encounters",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "treasure_encounters",
            "chance": 0.5,
            "branchWeight": 0,
            "requirements": "adventurers_whip > 0",
            "skip": true
        }
    ],
    [
        {
            "type": ["Mine_Room_Small"],
            "tag": "altar",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Small"],
            "tag": "secret",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "secret",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "secret",
            "chance": 0.5,
            "branchWeight": 1,
            "requirements": "adventurers_hat > 0",
            "skip": true
        }
    ],
    [
        {
            "type": ["SleepyHoodyRoom"],
            "tag": "hoody",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "hidden",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Large"],
            "tag": "relic_altar",
            "chance": 0.0625,
            "branchWeight": 0
        }
    ],
    [
        {
            "type": ["Mine_Room_Small"],
            "tag": "tribute_fountain",
            "chance": 0.0625,
            "branchWeight": 0
        }
    ]
]);
const mineEncounterGroups = Object.freeze({
    "Mine_Room_Small": {
        "begin": [
            {
                "weight": 4,
                "name": "Mine_Small_Begin_Plain",
                "requirements": "",
                "sequence": {
                    "type": ["Mine_Room_Small"],
                    "tag": "hoodie_entrance",
                    "chance": 1,
                    "branchWeight": 1
                }
            }
        ],
        "normal_encounters": [
            { "weight": 3, "name": "Mine_Small_Normal_MineCart", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_Pillar", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_PillarHole", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_PillarSpinner", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_RockWall", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_SouthNorthHole", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_StationarySpinners", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_BrokenCarts", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_StatueSpinner", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Normal_Bridge", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_EWSpinners", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_CornerHoles", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_DualPillar", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_Spikes", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_SpikePatch", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_PillarSpawner", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Normal_SetPiece", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Normal_HoleEW", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Normal_HoleEWSpinner", "requirements": "" },
            { "weight": 4, "name": "Mine_Small_Normal_Plain", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Normal_HazardHeavy", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Normal_DangerWalls", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_TilePattern", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_CornerRocks", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Normal_RockPath", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_DiagonalHole", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_CenterTorches", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Normal_Ruins", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_Statues", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Normal_LargeSpinnerTrack", "requirements": "" }
        ],
        "end_encounters": [
            { "weight": 1, "name": "Mine_Small_End_Normal", "requirements": "", "m_value": "end" },
            { "weight": 1, "name": "Mine_Small_End_Worm", "requirements": "end_worm", "m_value": "end_worm" },
            { "weight": 1, "name": "Mine_Small_End_Tutorial", "requirements": "", "m_value": "end_tutorial" },
            { "weight": 1, "name": "Mine_Small_End_Boss", "requirements": "", "m_value": "end_boss" }
        ],
        "relic_encounters_unlocked": [
            { "weight": 4, "name": "Mine_Small_Relic_Locked_Pots", "requirements": "" },
            { "weight": 4, "name": "Mine_Small_Relic_Locked_Torches", "requirements": "" },
            { "weight": 4, "name": "Mine_Small_Relic_Locked_Hole", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Relic_Locked_TorchPuzzle", "requirements": "" },
            { "weight": 4, "name": "Mine_Small_Relic_Locked_Statues", "requirements": "" }
        ],
        "relic_encounters": [
            { "weight": 4, "name": "Mine_Small_Relic_Locked_Pots", "requirements": "" },
            { "weight": 4, "name": "Mine_Small_Relic_Locked_Torches", "requirements": "" },
            { "weight": 4, "name": "Mine_Small_Relic_Locked_Hole", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Relic_Locked_TorchPuzzle", "requirements": "" },
            { "weight": 4, "name": "Mine_Small_Relic_Locked_Statues", "requirements": "" }
        ],
        "special_encounters": [
            { "weight": 1, "name": "Mine_Small_Special_DodsonCage", "requirements": "peasant1_unlocked == 0", "m_value": "DodsonCageEncounter" },
            { "weight": 1, "name": "Mine_Small_Special_WaylandShop", "requirements": "blacksmith_rescued == 0", "m_value": "waylandshop" },
            { "weight": 1, "name": "Mine_Small_Special_WaylandShopHallway", "requirements": "blacksmith_rescued == 0", "m_value": "waylandshophallway" },
            { "weight": 1, "name": "Mine_Small_Special_MushroomFamily", "requirements": "mushroom_green == 0, apprentice_met > 0", "m_value": "mushroom" },
            { "weight": 1, "name": "Mine_Small_Special_MushroomFarm", "requirements": "mushroom_blue == 0, apprentice_met > 0", "m_value": "mushroom" },
            { "weight": 1, "name": "Mine_Small_Special_BlackRabbit", "requirements": true, "m_value": "black_rabbit_first" },
            { "weight": 1, "name": "Mine_Small_Special_Hoodie_Unlocked", "requirements": false, "m_value": "hoodie_entrance" },
            { "weight": 1, "name": "Mine_Small_Special_TributeFountain", "requirements": "tribute_fountain_encountered == 0, bog_unlocked > 0", "m_value": "tribute_fountain" }
        ],
        "secret": [
            { "weight": 4, "name": "Mine_Small_Secret_WaterChest", "requirements": "" },
            { "weight": 4, "name": "Mine_Small_Secret_Carts", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Secret_Altar", "requirements": "" },
            {
                "weight": 3,
                "name": "Mine_Small_Secret_CursedTorch",
                "requirements": "",
                "sequence": {
                    "type": ["Mine_Room_Small", "Mine_Room_Large"],
                    "tag": "secret",
                    "chance": 0.25,
                    "branchWeight": 0,
                    "skip": true
                }
            },
            { "weight": 3, "name": "Mine_Small_Secret_Crystals", "requirements": "" },
            { "weight": 4, "name": "Mine_Small_Secret_Chest", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Secret_SpikeSacrifice", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Secret_Blessing", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Secret_Items", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Secret_Chest", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Secret_ChestCommon", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Secret_KeyBlock", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Secret_Bombs", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Secret_LeverBlocks", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Secret_Tent", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Secret_Nugg", "requirements": "" },
            {
                "weight": 3,
                "name": "Mine_Small_Secret_Bard",
                "requirements": false,
                "sequence": {
                    "type": ["Mine_Room_Small", "Mine_Room_Large"],
                    "tag": "secret",
                    "chance": 0.25,
                    "branchWeight": 0,
                    "skip": true
                }
            },
            { "weight": 3, "name": "Mine_Small_Secret_TributeFountain", "requirements": false }
        ],
        "hidden": [
            { "weight": 3, "name": "Mine_Small_Hidden_WaterChest", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Hidden_Carts", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Hidden_TreasureHunt", "requirements": "secret_treasure_note == 0" },
            { "weight": 1, "name": "Mine_Small_Hidden_Altar", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Hidden_CursedTorch", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Hidden_CursedRelic", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Hidden_Crystals", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Hidden_Lab", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Hidden_Chest", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Hidden_SpikeSacrifice", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Hidden_Blessing", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Hidden_Blessing02", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Hidden_ButchersRoom", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Hidden_Chest", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Hidden_Bard", "requirements": false }
        ],
        "treasure_encounters": [
            { "weight": 3, "name": "Mine_Small_Treasure_Skeleton", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Treasure_Rocks", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Treasure_Spikes", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Treasure_HoleBridges", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Treasure_LockedRocks", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Treasure_StatuePuzzle", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Treasure_LockedBlocks", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Treasure_CursedRelics", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Treasure_SpikeCage", "requirements": "" },
            { "weight": 3, "name": "Mine_Small_Treasure_RockCage", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Treasure_SpikeSacrifice", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Treasure_DiagonalRocks", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Treasure_HealthLever", "requirements": "" },
            { "weight": 2, "name": "Mine_Small_Treasure_Pillar", "requirements": "" },
            { "weight": 1, "name": "Mine_Small_Hidden_Altar", "requirements": "" }
        ],
        "altar": [
            {
                "weight": 2,
                "name": "Mine_Small_Altar_Torches",
                "requirements": false,
                "sequence": {
                    "type": ["Mine_Room_Small"],
                    "tag": "altar_guacamole",
                    "chance": 1,
                    "branchWeight": 1
                }
            },
            {
                "weight": 2,
                "name": "Mine_Small_Altar_Statues",
                "requirements": false,
                "sequence": {
                    "type": ["Mine_Room_Small"],
                    "tag": "altar_guacamole",
                    "chance": 1,
                    "branchWeight": 1
                }
            },
            {
                "weight": 2,
                "name": "Mine_Small_Altar_Bridges",
                "requirements": false,
                "sequence": {
                    "type": ["Mine_Room_Small"],
                    "tag": "altar_guacamole",
                    "chance": 1,
                    "branchWeight": 1
                }
            },
            {
                "weight": 2,
                "name": "Mine_Small_Altar_Tiled",
                "requirements": false,
                "sequence": {
                    "type": ["Mine_Room_Small"],
                    "tag": "altar_guacamole",
                    "chance": 1,
                    "branchWeight": 1
                }
            }
        ],
        "altar_locked": [
            { "weight": 2, "name": "Mine_Small_Altar_Torches", "requirements": false },
            { "weight": 2, "name": "Mine_Small_Altar_Statues", "requirements": false },
            { "weight": 2, "name": "Mine_Small_Altar_Bridges", "requirements": false },
            { "weight": 2, "name": "Mine_Small_Altar_Tiled", "requirements": false }
        ],
        "altar_guacamole": [
            { "weight": 2, "name": "Mine_Small_Altar_Torches", "requirements": true },
            { "weight": 2, "name": "Mine_Small_Altar_Statues", "requirements": true },
            { "weight": 2, "name": "Mine_Small_Altar_Bridges", "requirements": true },
            { "weight": 2, "name": "Mine_Small_Altar_Tiled", "requirements": true }
        ]
    },
    "Mine_Room_Large": {
        "normal_encounters": [
            { "weight": 2, "name": "Mine_Large_Normal_RailStatues", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_LargeRail", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_HoleBridge", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_RailSnake", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_Staging", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_PillarRocks", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_SpikeDonut", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_RailBrideLoop", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_RailBridge", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Normal_OilBarrels", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_MineField", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_Bridges", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_Spikes", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_CornerNE", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Normal_LandBridgeNS", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_DualPillars", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_SpikeBridge", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_CornerSW", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_RockCross", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_SlotHoles", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_RockColumns", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_ATrack", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_DynamicHole", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_TeeRocks", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_HoleArrows", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Normal_DualSetPiece", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_Arena", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_ArenaTrack", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_QuadPillars", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_RockArrowMaze", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_RailGuantlet", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_HazardHeavy", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_ArrowGuantlet", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_DonutSpinner", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_CornerRocks", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_TeeJunction", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_CornerBridge", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_BridgeHole", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_BigRocks", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_TriangleRocks", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_SnakeBridge", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_RandomBlocks", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_Empty", "requirements": "" },
            { "weight": 4, "name": "Mine_Large_Normal_TwoSetPiece", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_Grassy", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_FivePillars", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Normal_SnakeTrack", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Normal_Torches", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Normal_RailIslands", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Normal_MushroomGrowOp", "requirements": "" }
        ],
        "secret": [
            { "weight": 5, "name": "Mine_Large_Secret_GrassChests", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Secret_Altar", "requirements": "" },
            { "weight": 5, "name": "Mine_Large_Secret_Blessing", "requirements": "" },
            { "weight": 5, "name": "Mine_Large_Secret_BasicItems", "requirements": "" },
            { "weight": 5, "name": "Mine_Large_Secret_Gold", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Secret_BlackRabbitShop", "requirements": "black_rabbit_met" },
            { "weight": 5, "name": "Mine_Large_Secret_Potion", "requirements": "" },
            { "weight": 5, "name": "Mine_Large_Secret_Chest", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Secret_CursedTorch", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Secret_DangerousToGo", "requirements": "delve_count>8" },
            { "weight": 5, "name": "Mine_Large_Secret_SpikedFood", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Secret_DoubleLockBlock", "requirements": "" },
            { "weight": 4, "name": "Mine_Large_Secret_StatueBombPuzzle", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Secret_Pillars", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Secret_OilyBridge", "requirements": "" }
        ],
        "hidden": [
            { "weight": 2, "name": "Mine_Large_Hidden_LeverBlocks", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Hidden_GrassChests", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Hidden_TorchPuzzle", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Hidden_Keys", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Hidden_Potions", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Hidden_Blessing", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Hidden_Blessing02", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Hidden_CursedRelics", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Hidden_Altar", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Hidden_PressureTrap", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Hidden_ChooseBlessing", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Hidden_BobosLair", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Hidden_CaveIn", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Hidden_Gap", "requirements": "" }
        ],
        "treasure_encounters": [
            { "weight": 3, "name": "Mine_Large_Treasure_ItemBlocks", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Treasure_SpikedChest", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Treasure_HoleSpikeChest", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Treasure_TorchPuzzle", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Treasure_SpikeRails", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Treasure_BridgePuzzle", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Treasure_BombPuzzle", "requirements": "" },
            { "weight": 4, "name": "Mine_Large_Treasure_JustSomeTreasure", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Treasure_LeverBridge", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Treasure_VerticalBridge", "requirements": "" },
            { "weight": 4, "name": "Mine_Large_Treasure_Decision", "requirements": "" },
            { "weight": 3, "name": "Mine_Large_Treasure_HealthLever", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Treasure_OilChest", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Treasure_FireyChest", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Treasure_ElectrifiedChest", "requirements": "" },
            { "weight": 4, "name": "Mine_Large_Treasure_JustSomeTreasure02", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Treasure_Nexus", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Treasure_TwoBombsOneKey", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Treasure_SpikeSacrifice", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Treasure_Choice", "requirements": "" },
            { "weight": 2, "name": "Mine_Large_Treasure_DoubleRail", "requirements": "" },
            { "weight": 1, "name": "Mine_Large_Treasure_RockLock", "requirements": "" }
        ]
    },
    "SleepyHoodyRoom": {
        "hoody": [
            { "weight": 1, "name": "SleepyHoodyRoom", "requirements": false, "m_value": "hoodie_entrance" }
        ]
    },
    "direct": [
        { "weight": 1, "name": "Mine_Small_Special_DodsonCage", "requirements": "peasant1_unlocked == 0", "m_value": "DodsonCageEncounter" },
        { "weight": 1, "name": "Mine_Small_Special_WaylandShop", "requirements": "blacksmith_rescued == 0", "m_value": "waylandshop" },
        { "weight": 1, "name": "Mine_Small_Special_WaylandShopHallway", "requirements": "blacksmith_rescued == 0", "m_value": "waylandshophallway" },
        { "weight": 1, "name": "Mine_Small_Special_MushroomFamily", "requirements": "mushroom_green == 0, apprentice_met > 0", "m_value": "mushroom" },
        { "weight": 1, "name": "Mine_Small_Special_MushroomFarm", "requirements": "mushroom_blue == 0, apprentice_met > 0", "m_value": "mushroom" },
        { "weight": 1, "name": "Mine_Small_Special_BlackRabbit", "requirements": true, "m_value": "black_rabbit_first" },
        { "weight": 1, "name": "Mine_Small_Special_Hoodie_Locked", "requirements": false, "m_value": "hoodie_entrance" },
        { "weight": 1, "name": "Mine_Small_Special_Hoodie_Unlocked", "requirements": false, "m_value": "hoodie_entrance" },
        { "weight": 1, "name": "Mine_Small_Special_TributeFountain", "requirements": false, "m_value": "tribute_fountain" },
        { "weight": 1, "name": "Mine_Small_End_Normal", "requirements": "", "m_value": "end" },
        { "weight": 1, "name": "Mine_Small_End_Worm", "requirements": "end_worm", "m_value": "end_worm" },
        { "weight": 1, "name": "Mine_Small_End_Tutorial", "requirements": "", "m_value": "end_tutorial" },
        { "weight": 1, "name": "Mine_Small_End_Boss", "requirements": "", "m_value": "end_boss" }
    ]
});
function getRooms(floor, seed) {
    seed = parseInt(e$('seed-input').value) + 1;
    const randLayout = new Random(seed);
    const door = 0;
    for (const roomGroup of floor) {
        for (const room of roomGroup) {
            function getRoom(room2) {
                if (room2.chance < 1 && room2.chance < randLayout.value) {
                    console.log(`Skipping room: ${room2.tag} due to low chance`);
                    return false;
                }
                if (room2.skip == true) {
                    console.log(`Skipping room: ${room2.tag} due to invalid requirements`);
                    return false;
                }
                const type = room2.type[randLayout.range(0, room2.type.length)];
                if (mineEncounterGroups[type][room2.tag]) {
                    return randLayout.getWeightedTable(mineEncounterGroups[type][room2.tag]);
                }
                else {
                    return mineEncounterGroups.direct.find(encounter => encounter.m_value === room2.tag);
                }
            }
            const currentRoom = getRoom(room);
            if (currentRoom.requirements) {
                console.log(`Skipping room: ${currentRoom.name} due to internal requirements`);
                continue;
            }
            if (currentRoom) {
                currentRoom.weight = 0;
                console.log(currentRoom.name);
            }
            let nextRoom = null;
            if (currentRoom.sequence) {
                nextRoom = getRoom(currentRoom.sequence);
                if (nextRoom.requirements) {
                    console.log(`Skipping sub-room: ${nextRoom.name} due to internal requirements`);
                    nextRoom = null;
                }
            }
            if (nextRoom) {
                nextRoom.weight = 0;
                console.log(nextRoom.name);
            }
        }
    }
}
function listCraftable(table) {
    const selection = document.getElementById(`${table}-selection`);
    selection.innerHTML = `<legend>Crafted ${table}s</legend>`;
    masterTable[table].forEach((item, index) => {
        if (item.crafting != '-') {
            const itemCheckbox = document.createElement('input');
            itemCheckbox.type = 'checkbox';
            itemCheckbox.value = index;
            const itemLable = document.createElement('label');
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
    const altarSelection = document.getElementById('altar');
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
    altarSelection.value = '';
}
const lootTables = {
    "relic": [],
    "relicAll": [],
    "relicShop": [],
    "relicFinal": [],
    "relicStarter": [],
    "relicLegendary": [],
    "potion": [],
    "potionShop": [],
    "potionDibble": [],
    "potionFinal": [],
    "food": [],
    "item": [],
    "itemShop": [],
    "itemDibble": [],
    "dibble": [],
    "dibbleRelic": [],
    "potionOrRelic": []
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
    "altarRelic": -1,
    flags: {
        "shop_basic_item": 1,
        "shop_food": 1,
        "shop_potion_relic": 1,
        "dibble_extra_item": 0,
        "dibble_relic": 0
    }
};
const seedRand = new Random(Date.now());
function loadLootTables() {
    Object.values(masterTable).forEach((subTable) => {
        subTable.forEach((item, masterIndex) => {
            Object.entries(item.tables).forEach(([key, table]) => {
                const tableB = table;
                lootTables[key][tableB.index] = { "weight": tableB.weight, "masterIndex": masterIndex };
            });
        });
    });
}
function nextItem(table = 'relic', randState = 'relic') {
    table = lootTables[table];
    const itemID = rand[randState].getWeightedElement(table);
    return { "relic": masterTable.relic[itemID], "masterIndex": itemID };
}
function toggleWeight(indices = 157, subTable = 'relic', isZero = true) {
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
    toggleWeight([133, 134, 157], 'relic', !on);
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
    e$('levels').appendChild(field);
    const subfield = e$c("fieldset", { id: "dibble", classList: "level" });
    const sublegend = e$c("legend", { textContent: "Dibble" });
    subfield.appendChild(sublegend);
    e$('hub').appendChild(subfield);
    items.forEach((item, i) => {
        e$('dibble').appendChild(e$c("div", { classList: `icon-${item.type}`, innerText: item.display }));
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
        table.push({ "key": "food", "type": "food", "randState": "shopHealth" });
    }
    for (let i = 0; i < totalBasic; ++i) {
        table.push({ "key": "item", "type": "item", "randState": "shopBasicItem" });
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
    e$('levels').innerHTML = '';
    loadLootTables();
    nextRand(seed);
    toggleUncheckedItems();
    let currentRelics;
    let relicText;
    toggleWeight(3, 'food');
    toggleWeight(66, 'potion');
    toggleWeight(133);
    toggleWeight(134);
    toggleWeight(157);
    dibble(seed);
    if (e$('altar').value) {
        toggleWeight(e$('altar').value);
    }
    nextZone('mine', 0, 'The Goldmines', seed);
    nextZone('dungeon', 1, 'Delvemore Dungeon', seed);
    nextZone('halls', 2, 'Halls of Din', seed);
    nextZone('caverns', 3, 'The Shimmering Caverns', seed);
    nextZone('core', 4, 'Golden Core', seed);
    function nextZone(zone, zoneID, title, seed) {
        seed += zoneID * 5;
        let field = document.createElement("fieldset");
        field.id = zone;
        field.classList.add('zone');
        let legend = document.createElement("legend");
        legend.textContent = title;
        field.appendChild(legend);
        e$('levels').appendChild(field);
        for (let i = 1; i <= 4; ++i) {
            nextRand(seed + i);
            let subfield = document.createElement("fieldset");
            subfield.id = zone + i;
            subfield.classList.add('level');
            let sublegend = document.createElement("legend");
            sublegend.textContent = 'Level ' + i;
            subfield.appendChild(sublegend);
            e$(zone).appendChild(subfield);
            let relicRoom = document.createElement("div");
            relicRoom.id = 'relic' + zone + i;
            relicRoom.classList.add('icon-relicOn');
            e$(zone + i).appendChild(relicRoom);
            let relic;
            if (((zoneID + i) === 1) && e$('new-save-radio').checked) {
                toggleWeight(146, "relic");
                relic = nextItem('relicStarter');
            }
            else {
                relic = nextItem('relic');
            }
            toggleWeight(relic.masterIndex);
            relicText = document.createElement("div");
            relicText.classList.add('icon-relic');
            relicText.innerHTML = relic.relic.display;
            e$('relic' + zone + i).appendChild(relicText);
            if ((zoneID + i) > 1) {
                shop(zone, i);
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const saveSelection = e$("save-radio-selecion");
    const newRadio = e$('new-save-radio');
    const fullRadio = e$('100-save-radio');
    const loadRadio = e$('own-save-radio');
    const loadInput = e$('save-file-input');
    const randomSeedButton = e$('random-seed-button');
    const loadSeedButton = e$('load-seed-button');
    listCraftable('relic');
    listCraftable('potion');
    populateAltar();
    loadLootTables();
    randomSeed();
    newRadio.checked = true;
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
        else {
            settings = loadSave(event.target);
            applySettings(settings);
            loadSeed();
        }
    });
    loadInput.addEventListener('change', () => {
        loadRadio.checked = true;
        e$("save-radio-selecion").dispatchEvent(radioEvent);
    });
    randomSeedButton.addEventListener('click', randomSeed);
    loadSeedButton.addEventListener('click', loadSeed);
});
