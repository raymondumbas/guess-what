# Data Schema

## games
All created games

| Column Name | Value | Notes|
|:----: |:----:|:-----:|
| ID | UUID | Primary Key (universal) |
| game_id | UUID | |
| name | TEXT||


## players
| Column Name | Value | Notes|
|:----: |:----:|:-----:|
| ID | UUID | Primary Key (universal) |
| user_id | UUID| |
| game_id | UUID| |
| score | INT | Number of correct guesses|


## rounds
| Column Name | Value | Notes|
|:----: |:----:|:-----:|
| ID | UUID | Primary Key (universal) |
| game_id | UUID | |
| round_num | UUID||
| option | TEXT ||


## predictions
| Column Name | Value | Notes|
|:----: |:----:|:-----:|
| ID | UUID | Primary Key (universal) |
| game_id | UUID | |
| user_id | UUID | |
| round_num| UUID | |