execute if score @s magic_system matches 100 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.707107 0.0
execute if score @s magic_system matches 98 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.840896 0.0
execute if score @s magic_system matches 96 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.749154 0.0
execute if score @s magic_system matches 94 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.890899 0.0
execute if score @s magic_system matches 92 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.793701 0.0
execute if score @s magic_system matches 90 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.943874 0.0
execute if score @s magic_system matches 88 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 1.0 0.0
execute if score @s magic_system matches 81..100 run scoreboard players remove @p[r=3,tag=used_magic_player_lula] magic_system 1
execute if score @s magic_system matches 81..100 run scoreboard players remove @s magic_system 1
tag @s[scores={magic_system=80}] add "!!remove"
execute if score @s magic_system = @p[r=3,tag=used_magic_player_lula] magic_system at @p[r=3,tag=used_magic_player_lula] run tp @s ~ ~ ~ ~ ~
execute if score @s magic_system matches 80 if score @s magic_system = @p[r=3,tag=used_magic_player_lula] magic_system as @p[r=3,tag=used_magic_player_lula] run effect @s levitation 4 255 true