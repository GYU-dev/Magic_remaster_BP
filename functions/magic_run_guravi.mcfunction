execute unless entity @e[r=3,type=magic_remaster:magic_circle_small,name=magic_circle_guravi] run summon magic_remaster:magic_circle_small ^ ^ ^1 ~ ~ minecraft:entity_spawned magic_circle_guravi
tag @e[type=magic_remaster:magic_circle_small,name=magic_circle_guravi,r=3,tag=activated] remove activated
scoreboard players set @e[type=magic_remaster:magic_circle_small,name=magic_circle_guravi,r=3,tag=!activated] magic_system 200
scoreboard players set @s magic_system 200
tag @e[type=magic_remaster:magic_circle_small,name=magic_circle_guravi,r=3,tag=!activated] add activated
tellraw @a[r=30] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> 重力よ、圧せ。 -§8§lグラヴィ§r。"}]}
tag @s add used_magic_player_guravi
scoreboard players remove @s mana 25
scoreboard players add @s exp 5