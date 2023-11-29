package org.advent.day1;

/**
 * Elf that is assigned calories
 */
public class Elf implements Comparable<Elf> {

    private int totalCalories = 0;

    /**
     * Calories carried by the Elf
     * @return total calories
     */
    public int getTotalCalories() {
        return totalCalories;
    }

    /**
     * Add calories to this Elf
     * @param calories number of calories to add
     */
    public void addCalories(int calories) {
        this.totalCalories += calories;
    }

    @Override
    public int compareTo(Elf arg0) {
        return this.totalCalories - arg0.totalCalories;
    }

}
