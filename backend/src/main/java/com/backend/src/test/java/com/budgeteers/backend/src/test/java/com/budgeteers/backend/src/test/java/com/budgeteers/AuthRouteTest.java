package com.budgeteers;

import com.budgeteers.controllers.AuthController;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

public class AuthRouteTest {

    @Test
    public void testSecureRouteWithValidToken() {
        AuthController controller = new AuthController();
        ResponseEntity<String> response =
                controller.getSecurePage("Bearer VALIDTOKEN");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Authenticated access granted", response.getBody());
    }

    @Test
    public void testSecureRouteMissingToken() {
        AuthController controller = new AuthController();
        ResponseEntity<String> response =
                controller.getSecurePage(null);

        assertEquals(401, response.getStatusCodeValue());
    }
}
