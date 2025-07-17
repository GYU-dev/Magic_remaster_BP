execute unless entity @e[r=3,type=magic_remaster:magic_circle_small,name=magic_circle_jisin] run summon magic_remaster:magic_circle_small ^ ^ ^1 ~ ~ minecraft:entity_spawned magic_circle_jisin
tag @e[type=magic_remaster:magic_circle_small,name=magic_circle_jisin,r=3,tag=activated] remove activated
scoreboard players set @e[type=magic_remaster:magic_circle_small,name=magic_circle_jisin,r=3,tag=!activated] magic_system 90
scoreboard players set @s magic_system 90
tag @e[type=magic_remaster:magic_circle_small,name=magic_circle_jisin,r=3,tag=!activated] add activated
tellraw @a[r=15] {"rawtext":[{"selector":"@s"},{"text":"の §n§lじしん §r攻撃！"}]}
tag @s add used_magic_player_jisin
scoreboard players remove @s mana 5
scoreboard players add @s exp 5