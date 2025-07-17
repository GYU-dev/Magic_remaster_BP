execute anchored eyes unless entity @e[r=3,type=magic_remaster:magic_circle_verticle_small,name=magic_circle_akula] run summon magic_remaster:magic_circle_verticle_small ^ ^ ^1 ~ ~ minecraft:entity_spawned magic_circle_akula
execute anchored eyes positioned ^ ^ ^1 run tag @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_akula,r=3,tag=activated] remove activated
execute anchored eyes positioned ^ ^ ^1 run scoreboard players set @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_akula,r=3,tag=!activated] magic_system 90
scoreboard players set @s magic_system 90
execute anchored eyes positioned ^ ^ ^1 run tag @e[type=magic_remaster:magic_circle_verticle_small,name=magic_circle_akula,r=3,tag=!activated] add activated
tellraw @a[r=10] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> ぶち抜け、水の弾圧。 -§1§lアクラ§r。"}]}
tag @s add used_magic_player_akula
scoreboard players remove @s mana 5
scoreboard players add @s exp 5