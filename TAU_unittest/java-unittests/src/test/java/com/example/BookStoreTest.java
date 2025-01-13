package com.example;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class BookStoreTest {
    private BookStore bookStore;

    @BeforeEach
    public void setUp() {
        bookStore = new BookStore();
    }

    // Testy z assertTrue
    @Test
    public void testBookIsAvailableAfterAdding() {
        bookStore.addBook("The Hobbit", 5);
        Assertions.assertTrue(bookStore.isBookAvailable("The Hobbit"));
    }

    // Testy z assertEquals
    @Test
    public void testBookQuantityIncreasesWhenAddingBooks() {
        bookStore.addBook("1984", 3);
        Assertions.assertEquals(3, bookStore.getBookQuantity("1984"));
        bookStore.addBook("1984", 2);
        Assertions.assertEquals(5, bookStore.getBookQuantity("1984"));
    }

    // Testy z assertThrows
    @Test
    public void testRemovingUnavailableBookThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> {
            bookStore.removeBook("The Catcher in the Rye");
        });
    }

    // Test sprawdzający poprawność zmniejszania ilości książek
    @Test
    public void testRemoveBookReducesQuantity() {
        bookStore.addBook("The Hobbit", 3);
        bookStore.removeBook("The Hobbit");
        Assertions.assertEquals(2, bookStore.getBookQuantity("The Hobbit"));
    }

    // Test dla książki o zerowej ilości
    @Test
    public void testIsBookUnavailableWhenQuantityZero() {
        bookStore.addBook("The Witcher: The lady of the lake", 1);
        bookStore.removeBook("The Witcher: The lady of the lake");
        Assertions.assertFalse(bookStore.isBookAvailable("The Witcher: The lady of the lake"));
    }

    // Test dla dodawania książek o tym samym tytule
    @Test
    public void testAddSameBookMultipleTimes() {
        bookStore.addBook("Moby Dick", 2);
        bookStore.addBook("Moby Dick", 3);
        Assertions.assertEquals(5, bookStore.getBookQuantity("Moby Dick"));
    }

    // Test sprawdzający wyjątek przy usunięciu książki, która już nie jest dostępna
    @Test
    public void testRemoveBookThatIsNoLongerAvailable() {
        bookStore.addBook("To Kill a Mockingbird", 1);
        bookStore.removeBook("To Kill a Mockingbird");
        assertThrows(IllegalArgumentException.class, () -> {
            bookStore.removeBook("To Kill a Mockingbird");
        });
    }

    // Test sprawdzający, że księgarnia nie ma książki, której nie dodano
    @Test
    public void testBookNotAvailableIfNotAdded() {
        Assertions.assertFalse(bookStore.isBookAvailable("Harry Potter"));
    }

    // Test sprawdzający dostępność książki, gdy została dodana, a później usunięta
    @Test
    public void testBookNotAvailableAfterAllCopiesRemoved() {
        bookStore.addBook("The Alchemist", 1);
        bookStore.removeBook("The Alchemist");
        Assertions.assertFalse(bookStore.isBookAvailable("The Alchemist"));
    }

    // Test dodawania książki z zerową ilością
    @Test
    public void testAddBookWithZeroQuantity() {
        bookStore.addBook("War and Peace", 0);
        Assertions.assertFalse(bookStore.isBookAvailable("War and Peace"));
    }
}
