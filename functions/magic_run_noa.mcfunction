execute anchored eyes unless entity @e[r=3,type=magic_remaster:magic_circle_verticle_small,name=magic_circle_noa] run summon magic_remaster:magic_circle_verticle_small ^ ^ ^1 ~ ~ minecraft:entity_spawned magic_circle_noa
execute anchored eyes positioned ^ ^ ^1 run tag @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_noa,r=3,tag=activated] remove activated
execute anchored eyes positioned ^ ^ ^1 run scoreboard players set @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_noa,r=3,tag=!activated] magic_system 50
scoreboard players set @s magic_system 50
execute anchored eyes positioned ^ ^ ^1 run tag @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_noa,r=3,tag=!activated] add activated
tellraw @a[r=10] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> 無より出でて、無へ還れ。 -§f§lノア§r。"}]}
tag @s add used_magic_player_noa
scoreboard players remove @s mana 5
scoreboard players add @s exp 5