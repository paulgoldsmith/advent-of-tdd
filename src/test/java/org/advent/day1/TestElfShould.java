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

    @Test
    void elf1_test_with_1000_and_then_2000_and_then_3000_calories_added() {

        Elf elf1 = new Elf();

        //Act
        elf1.addCalories(1000);
        elf1.addCalories(2000);
        elf1.addCalories(3000);

        assertThat(elf1.getTotalCalories(), equalTo(6000));
    }

    @Test
    void elf2_test_with_4000_calories_added() {

        Elf elf2 = new Elf();

        elf2.addCalories(4000);

        assertThat(elf2.getTotalCalories(), equalTo(4000));
    }

    @Test
    void elf3_test_with_5000_and_then_6000_calories_added() {

        Elf elf3 = new Elf();

        elf3.addCalories(5000);
        elf3.addCalories(6000);

        assertThat(elf3.getTotalCalories(), equalTo(11000));
    }

    @Test
    void elf4_test_with_7000_and_then_8000_and_then_9000_calories_added() {

        Elf elf4 = new Elf();

        elf4.addCalories(7000);
        elf4.addCalories(8000);
        elf4.addCalories(9000);

        assertThat(elf4.getTotalCalories(), equalTo(24000));
    }

    @Test
    void elf5_test_with_10000_calories_added() {

        Elf elf5 = new Elf();

        elf5.addCalories(10000);

        assertThat(elf5.getTotalCalories(), equalTo(10000));
    }
}