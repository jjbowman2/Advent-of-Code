use crate::{Solution, SolutionPair};
use std::collections::HashMap;
use std::fs::read_to_string;

///////////////////////////////////////////////////////////////////////////////

pub fn get_input() -> String {
    read_to_string("input/day03.txt").unwrap()
}

pub fn get_column(input: &Vec<String>, column: usize) -> String {
    input
        .iter()
        .map(|line| line.chars().nth(column).unwrap())
        .collect::<String>()
}

pub fn solve() -> SolutionPair {
    let input = get_input();
    let mut counts = (0..input.lines().next().unwrap().len())
        .map(|_| HashMap::new())
        .collect::<Vec<HashMap<char, usize>>>();

    for (_, line) in input.lines().enumerate() {
        for (j, c) in line.chars().enumerate() {
            let map = counts.get_mut(j).unwrap();
            let current_count = map.get(&c).unwrap_or(&0);
            map.insert(c, *current_count + 1);
        }
    }
    let gamma = counts
        .iter()
        .map(|map| map.iter().max_by_key(|(_, v)| *v).unwrap().0)
        .collect::<String>();

    let epsilon = counts
        .iter()
        .map(|map| map.iter().min_by_key(|(_, v)| *v).unwrap().0)
        .collect::<String>();

    let gamma_decimal = usize::from_str_radix(&gamma, 2).unwrap();
    let epsilon_decimal = usize::from_str_radix(&epsilon, 2).unwrap();

    let sol1 = gamma_decimal * epsilon_decimal;

    let mut oxygen_input: Vec<String> = input.split("\n").map(|s| s.to_string()).collect();
    let mut i = 0;
    while oxygen_input.len() > 1 {
        let column = get_column(&oxygen_input, i);
        // get the counts of both 0 and 1 in the column
        let zero_count = column.chars().filter(|c| c == &'0').count();
        let one_count = column.chars().filter(|c| c == &'1').count();
        // get the most common character, returning 1 if they are equal
        let most_common = if zero_count > one_count { '0' } else { '1' };
        oxygen_input = oxygen_input
            .iter()
            .filter(|line| line.chars().nth(i).unwrap() == most_common)
            .map(|s| s.to_string())
            .collect();
        i += 1;
    }

    let oxygen_level = oxygen_input.get_mut(0).unwrap();
    let oxygen_level_decimal = usize::from_str_radix(&oxygen_level, 2).unwrap();

    let mut co2_input: Vec<String> = input.split("\n").map(|s| s.to_string()).collect();
    let mut i = 0;
    while co2_input.len() > 1 {
        let column = get_column(&co2_input, i);
        // get the counts of both 0 and 1 in the column
        let zero_count = column.chars().filter(|c| c == &'0').count();
        let one_count = column.chars().filter(|c| c == &'1').count();
        // get the least common character, returning 0 if they are equal
        let least_common = if zero_count <= one_count { '0' } else { '1' };

        co2_input = co2_input
            .iter()
            .filter(|line| line.chars().nth(i).unwrap() == least_common)
            .map(|s| s.to_string())
            .collect();
        i += 1;
    }
    let co2_level = co2_input.get_mut(0).unwrap();
    let co2_level_decimal = usize::from_str_radix(&co2_level, 2).unwrap();

    // print the binary and decimal versions of oxygen and co2
    println!("Oxygen: {} ({})", oxygen_level, oxygen_level_decimal);
    println!("CO2: {} ({})", co2_level, co2_level_decimal);
    let sol2 = oxygen_level_decimal * co2_level_decimal;
    (Solution::from(sol1), Solution::from(sol2))
}
