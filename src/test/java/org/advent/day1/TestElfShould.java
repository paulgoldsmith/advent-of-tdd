package org.advent.day1;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.lessThan;

import org.junit.jupiter.api.Test;

public class TestElfShould {
    @Test
    void have_zero_total_calories_when_created() {
        Elf elf = new Elf();
        assertThat(elf.getTotalCalories(), equalTo(0));
    }

    @Test
    void have_1000_total_calories_after_adding_1000() {
        // Arrange
        Elf elf = new Elf();

        // Act
        elf.addCalories(1000);

        // Assert
        assertThat(elf.getTotalCalories(), equalTo(1000));
    }

    @Test
    void compare_return_positive_value_for_elf_with_more_total_calories() {
        // Arrange
        Elf elf1 = new Elf();
        Elf elf2 = new Elf();
        elf1.addCalories(1000);

        // Act
        int compareTo = elf1.compareTo(elf2);

        // Act / Assert
        assertThat(compareTo, greaterThan(0));
    }

    @Test
    void compare_zero_for_equal_elf() {
        // Arrange
        Elf elf1 = new Elf();
        Elf elf2 = new Elf();

        // Act / Assert
        assertThat(elf1.compareTo(elf2), equalTo(0));
    }

    @Test
    void compare_zero_for_equal_elf_where_calories_are_non_zero() {
        // Arrange
        Elf elf1 = new Elf();
        Elf elf2 = new Elf();
        elf1.addCalories(1000);
        elf2.addCalories(1000);

        // Act / Assert
        assertThat(elf1.compareTo(elf2), equalTo(0));
    }

    @Test
    void compare_return_negative_value_for_elf_with_less_total_calories() {
                // Arrange
        Elf elf1 = new Elf();
        Elf elf2 = new Elf();
        elf2.addCalories(1000);

        // Act / Assert
        assertThat(elf1.compareTo(elf2), lessThan(0));
    }
}
