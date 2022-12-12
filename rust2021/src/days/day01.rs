use crate::{Solution, SolutionPair};

///////////////////////////////////////////////////////////////////////////////

pub fn get_input() -> String {
    std::fs::read_to_string("input/day01.txt").unwrap()
}

pub fn solve() -> SolutionPair {
    let input = get_input();
    //convert input to a vector of numbers
    let numbers: Vec<u64> = input
        .lines()
        .map(|line| line.parse::<u64>().unwrap())
        .collect();
    // count how many times each number increases from the last
    let mut increases = 0;
    for i in 1..numbers.len() {
        if numbers[i] > numbers[i - 1] {
            increases += 1;
        }
    }

    // keep a sliding window of size 3 and count how many times the sum of the window increases
    let mut window_increases = 0;
    let mut current_window_sum: i32 = numbers[0] as i32 + numbers[1] as i32 + numbers[2] as i32;
    for i in 3..numbers.len() {
        let new_window_sum: i32 = current_window_sum - numbers[i - 3] as i32 + numbers[i] as i32;
        if new_window_sum > current_window_sum {
            window_increases += 1;
        }
        current_window_sum = new_window_sum;
    }
    // Your solution here...
    let sol1: u64 = increases;
    let sol2: u64 = window_increases;

    (Solution::from(sol1), Solution::from(sol2))
}
