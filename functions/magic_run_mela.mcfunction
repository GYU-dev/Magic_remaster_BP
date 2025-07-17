execute anchored eyes unless entity @e[r=3,type=magic_remaster:magic_circle_verticle_small,name=magic_circle_mela] run summon magic_remaster:magic_circle_verticle_small ^ ^ ^1 ~ ~ minecraft:entity_spawned magic_circle_mela
execute anchored eyes positioned ^ ^ ^1 run tag @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_mela,r=3,tag=activated] remove activated
execute anchored eyes positioned ^ ^ ^1 run scoreboard players set @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_mela,r=3,tag=!activated] magic_system 50
scoreboard players set @s magic_system 50
execute anchored eyes positioned ^ ^ ^1 run tag @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_mela,r=3,tag=!activated] add activated
tellraw @a[r=10] {"rawtext":[{"selector":"@s"},{"text":"は §c§lメラ§rを となえた！"}]}
tag @s add used_magic_player_mela
scoreboard players remove @s mana 5
scoreboard players add @s exp 5