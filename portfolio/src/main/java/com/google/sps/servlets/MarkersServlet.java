package com.google.sps.servlets;

import com.google.sps.data.MapMarker;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Returns marker data as a JSON array, e.g. [{"lat": 0.00, "lng": 0.00}] */
@WebServlet("/marker-data")
public class MarkersServlet extends HttpServlet {

    private Collection<MapMarker> mapMarkers;

    @Override
    public void init() {
        mapMarkers = new ArrayList<>();

        Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/Markers.csv"));
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] cells = line.split(",");
            if (cells.length != 0) {
                double lat = Double.parseDouble(cells[0]);
                double lng = Double.parseDouble(cells[1]);
                String link = "" + cells[2];
                String content = "";
                for (int i = 3; i < cells.length; i++) {
                    content += cells[i];
                }

                mapMarkers.add(new MapMarker(lat, lng, link, content));
            }
        }
        scanner.close();
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        Gson gson = new Gson();
        String json = gson.toJson(mapMarkers);
        response.getWriter().println(json);
    }
}