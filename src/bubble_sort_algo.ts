/**
 * This function implements the Bubble Sort algorithm, which is a simple sorting
 * algorithm that repeatedly steps through the list, compares adjacent elements
 * and swaps them if they are in the wrong order. The pass through the list is
 * repeated until the list is sorted.
 *
 * @param myList - An array of numbers that you want to sort.
 * @returns A sorted array of numbers in ascending order.
 */
function bubble_sort_algo(myList: number[]): number[] {

  let len = myList.length; // Length of the array
  let sorted_: boolean; // Check if the array is sorted

  // Keep sorting until no more swaps are needed
  do {
    sorted_ = true; // Assume the array is sorted

    // Loop through the array
    for (let index = 0; index < len - 1; index++) {
      // Check If the current element is greater than the next
      if (myList[index] > myList[index + 1]) {
        // Swap the elements
        let temp = myList[index];
        myList[index] = myList[index + 1];
        myList[index + 1] = temp;

        // Swapped elements, set sorted_ to false
        sorted_ = false;
      }
    }

    len--; // Reduce the length after each pass
  } while (!sorted_)  // If no swaps, the array is sorted

  // Return the sorted array
  return myList;
}

// Test cases
const list_1 = [6, 5, 3, 1, 8, 7, 2, 4];
console.log(bubble_sort_algo(list_1));

const list_2 = [3, 1, 6, 1, 9, 2, 5, 4];
console.log(bubble_sort_algo(list_2));

const list_3 = [1, 4, 5, 7, 6, 3, 3, 4];
console.log(bubble_sort_algo(list_3));
