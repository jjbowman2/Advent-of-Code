use crate::{Solution, SolutionPair};
use std::fs::read_to_string;

///////////////////////////////////////////////////////////////////////////////

pub fn get_input() -> String {
    read_to_string("input/day02.txt").unwrap()
}

struct Command {
    direction: String,
    distance: i32,
}

pub fn solve() -> SolutionPair {
    let input = get_input();
    let commands: Vec<Command> = input
        .lines()
        .map(|line| {
            let mut parts = line.split(" ");
            let direction = parts.next().unwrap().to_string();
            let distance = parts.next().unwrap().parse::<i32>().unwrap();
            Command {
                direction,
                distance,
            }
        })
        .collect();

    let mut part_1_position = (0, 0);

    for command in &commands {
        match command.direction.as_str() {
            "up" => part_1_position.1 += command.distance,
            "down" => part_1_position.1 -= command.distance,
            "forward" => part_1_position.0 -= command.distance,
            _ => panic!("Invalid direction"),
        }
    }

    let mut part_2_position = (0, 0);
    let mut current_direction = 0;
    for command in &commands {
        match command.direction.as_str() {
            "up" => current_direction -= command.distance,
            "down" => current_direction += command.distance,
            "forward" => {
                part_2_position.0 += command.distance;
                part_2_position.1 += command.distance * current_direction;
            }
            _ => panic!("Invalid direction"),
        }
    }

    let sol1: i32 = part_1_position.0 * part_1_position.1;
    let sol2: i32 = part_2_position.0 * part_2_position.1;

    (Solution::from(sol1), Solution::from(sol2))
}
