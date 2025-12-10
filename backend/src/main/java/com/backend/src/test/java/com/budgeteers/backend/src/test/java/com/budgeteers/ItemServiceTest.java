package com.budgeteers;

import com.budgeteers.models.Item;
import com.budgeteers.services.ItemService;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ItemServiceTest {

    @Test
    public void testCreateAndRetrieveItems() {
        ItemService service = new ItemService();
        service.create(new Item("Test", 10));

        List<Item> items = service.getAll();
        assertEquals(1, items.size());
        assertEquals("Test", items.get(0).getName());
    }

    @Test
    public void testDelete() {
        ItemService service = new ItemService();
        service.create(new Item("DeleteMe", 5));

        boolean result = service.delete(1);

        assertTrue(result);
    }
}
