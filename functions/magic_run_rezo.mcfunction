execute anchored eyes unless entity @e[r=3,type=magic_remaster:magic_circle_verticle_small,name=magic_circle_rezo] run summon magic_remaster:magic_circle_verticle_small ^ ^ ^1 ~ ~ minecraft:entity_spawned magic_circle_rezo
execute anchored eyes positioned ^ ^ ^1 run tag @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_rezo,r=3,tag=activated] remove activated
execute anchored eyes positioned ^ ^ ^1 run scoreboard players set @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_rezo,r=3,tag=!activated] magic_system 200
scoreboard players set @s magic_system 200
execute anchored eyes positioned ^ ^ ^1 run tag @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_rezo,r=3,tag=!activated] add activated
tag @s add used_magic_player_rezo
scoreboard players remove @s mana 25
scoreboard players add @s exp 5