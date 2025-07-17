tp @s ~ ~-0.1 ~ ~ ~
tag @s add element_wind
scoreboard players remove @s magic_system 1
execute if entity @s[scores={magic_system=..0}] run tag @s add "!!remove"