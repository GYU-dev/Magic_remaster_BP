execute unless entity @e[r=3,type=magic_remaster:magic_circle_small,name=magic_circle_wido] run summon magic_remaster:magic_circle_small ~ ~ ~ ~ ~ minecraft:entity_spawned magic_circle_wido
execute anchored eyes positioned ~ ~-1 ~ run tag @e[type=magic_remaster:magic_circle_small,name=magic_circle_wido,r=3,tag=activated] remove activated
execute anchored eyes positioned ~ ~-1 ~ run scoreboard players set @e[type=magic_remaster:magic_circle_small,name=magic_circle_wido,r=3,tag=!activated] magic_system 15
scoreboard players set @s magic_system 15
execute anchored eyes positioned ~ ~-1 ~ run tag @e[type=magic_remaster:magic_circle_small,name=magic_circle_wido,r=3,tag=!activated] add activated
tellraw @a[r=10] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> 風よ、駆けろ。 -§a§lウィド§r。"}]}
tag @s add used_magic_player_wido
scoreboard players remove @s mana 5
scoreboard players add @s exp 5