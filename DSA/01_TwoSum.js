// "Two Sum".
// Given an array of integers `nums` and an integer `target`, return the *indices* of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.

//Here, we are checking if the indices has been repeated in temp.

const nums = [9,8,7,6]
const target = 5;

function twoSum(nums, target) {
    const temp = {}
    for (let i = 0; i < nums.length; i++) {
        const currNum = nums[i];
        console.log(currNum);
        
        const complement = target - currNum;
        console.log(complement);
        
        if (temp[complement] !== undefined) {
            return [temp[complement], i];
        }
        temp[currNum] = i;
    }
}
twoSum(nums,target)