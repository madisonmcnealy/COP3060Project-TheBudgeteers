package com.budgeteers;

import com.budgeteers.controllers.ItemController;
import com.budgeteers.models.Item;
import com.budgeteers.services.ItemService;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ItemControllerTest {

    @Test
    public void testGetAllItems() {
        ItemService mockService = mock(ItemService.class);
        when(mockService.getAll()).thenReturn(List.of(new Item("Groceries", 50)));

        ItemController controller = new ItemController(mockService);
        ResponseEntity<List<Item>> response = controller.getAll();

        assertEquals(1, response.getBody().size());
        assertEquals("Groceries", response.getBody().get(0).getName());
    }

    @Test
    public void testCreateItem() {
        ItemService mockService = mock(ItemService.class);
        Item input = new Item("Rent", 1000);
        when(mockService.create(input)).thenReturn(input);

        ItemController controller = new ItemController(mockService);
        ResponseEntity<Item> response = controller.create(input);

        assertEquals("Rent", response.getBody().getName());
        assertEquals(1000, response.getBody().getAmount());
    }

    @Test
    public void testDeleteItem() {
        ItemService mockService = mock(ItemService.class);
        when(mockService.delete(1)).thenReturn(true);

        ItemController controller = new ItemController(mockService);
        ResponseEntity<String> response = controller.delete(1);

        assertEquals("Item deleted", response.getBody());
    }
}
