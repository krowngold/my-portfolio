package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Returns Play Store data as a JSON object, e.g. {4.3, 500, 10000} */
@WebServlet("/playstore-data")
public class PlayStoreDataServlet extends HttpServlet {

    private ArrayList<ArrayList<Double>> playStoreReviews = new ArrayList<ArrayList<Double>>();

    //Gather data from CSV file through Scanner
    @Override
    public void init() {
        final Scanner scanner = new Scanner(getServletContext().getResourceAsStream(
        "/WEB-INF/PlayStore.csv"));
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] cells = line.split(",");
            Double rating;
            Double installs;

            try {
                rating = Double.valueOf(cells[0]);
                installs = Double.valueOf(cells[1]);
            } catch (ArrayIndexOutOfBoundsException e) {
                System.err.println("Split didn't result in proper number of cells");
                rating = 0.0;
                installs = 0.0;
            }
            
            ArrayList<Double> appReview = new ArrayList<>();
            appReview.add(rating);
            appReview.add(installs);
            playStoreReviews.add(appReview);
        }
        scanner.close();
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        Gson gson = new Gson();
        String json = gson.toJson(playStoreReviews);
        response.getWriter().println(json);
    }
}