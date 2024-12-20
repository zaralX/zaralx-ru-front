export function getHexColor(id) {
    const color = idColors[id];
    if (!color) {
        console.error('No hex color found for ' + id);
    }
    return color;
}

const idColors = {
    "obsidian": "#000005",
    "black_concrete": "#000005",
    "stone": "#5b5b5b",
    "stone_bricks": "#575757",
    "smooth_stone": "#707070",
    "andesite": "#818181",
    "gravel": "#8a8a8a",
    "smooth_quartz": "#e1e1e1",
    "snow_block": "#e1e1e1",
    "bedrock": "#343434",
    "diorite": "#cbcbcb",
    "glass_block": "#c7fff2",
    "granite": "#653836",
    "sand": "#ffca43",
    "water": "#008cff",
    "copper_ore": "#5b5959",
    "coal_ore": "#5b5959",
    "iron_ore": "#5b5959",
    "lava": "#ff710b",
    "packed_ice": "#92b9f5",
    "diamond_block": "#6aeeff",
    "grass_block": "#45733c",
    "dirt": "#533c28",
    "coarse_dirt": "#4d3825",
    "spruce_log": "#44321f",
    "spruce_wood": "#44321f",
    "spruce_planks": "#5b442d",
    "jungle_planks": "#8e6649",
}