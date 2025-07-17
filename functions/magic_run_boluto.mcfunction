execute unless entity @e[r=3,type=magic_remaster:magic_circle_small,name=magic_circle_boluto] run summon magic_remaster:magic_circle_small ^ ^ ^1 ~ ~ minecraft:entity_spawned magic_circle_boluto
tag @e[type=magic_remaster:magic_circle_small,name=magic_circle_boluto,r=3,tag=activated] remove activated
scoreboard players set @e[type=magic_remaster:magic_circle_small,name=magic_circle_boluto,r=3,tag=!activated] magic_system 50
scoreboard players set @s magic_system 50
tag @e[type=magic_remaster:magic_circle_small,name=magic_circle_boluto,r=3,tag=!activated] add activated
tellraw @a[r=10] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> 今、閃光となれ。 -§d§lボルト§r。"}]}
tag @s add used_magic_player_boluto
scoreboard players remove @s mana 5
scoreboard players add @s exp 5