execute unless entity @e[r=3,type=magic_remaster:magic_circle_small,name=magic_circle_lula] run summon magic_remaster:magic_circle_small ~ ~ ~ ~ ~ minecraft:entity_spawned magic_circle_lula
tag @e[type=magic_remaster:magic_circle_small,name=magic_circle_lula,r=3,tag=activated] remove activated
scoreboard players set @e[type=magic_remaster:magic_circle_small,name=magic_circle_lula,r=3,tag=!activated] magic_system 100
scoreboard players set @s magic_system 100
tag @e[type=magic_remaster:magic_circle_small,name=magic_circle_lula,r=3,tag=!activated] add activated
tellraw @a[r=10] {"rawtext":[{"selector":"@s"},{"text":"は §7§lルーラ§rを となえた！"}]}
tag @s add used_magic_player_lula
scoreboard players remove @s mana 25
scoreboard players add @s exp 5