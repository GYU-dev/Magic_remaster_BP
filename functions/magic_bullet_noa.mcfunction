tp @s ^ ^ ^0.5 ~ ~
particle minecraft:wind_charged_emitter ~ ~ ~
execute positioned ~ ~-1 ~ run damage @a[r=1] 1 magic
execute positioned ~ ~-1 ~ run damage @e[family=mob,type=!armor_stand,r=1] 1 magic
execute unless entity @p[r=32] run tag @s add "!!remove"
execute unless block ~ ~ ~ air run tag @s add "!!remove"
execute positioned ~ ~-1 ~ if entity @a[r=1] run tag @s add "!!remove"
execute positioned ~ ~-1 ~ if entity @e[family=mob,type=!armor_stand,r=1] run tag @s add "!!remove"
playsound break.amethyst_block @a[r=32] ~ ~ ~ 1.0 1.0 0.0
tag @s add element_none