
package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for listing comments. */
@WebServlet("/list-comments")
public class ListCommentsServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String maxInputString = request.getParameter("max");
        int maxInput;
        try {
            maxInput = Integer.parseInt(maxInputString);
        } catch (NumberFormatException e) {
            System.err.println("No number found. Using default value of 0.");
            maxInput = 0;
        }
        
        Query query = new Query("Comment");
        DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = ds.prepare(query);

        List<Comment> comments = new ArrayList<>();
        int i = 0;
        for (Entity entity : results.asIterable()) {
            if (i >= maxInput) {
                break;
            }
            String name = (String) entity.getProperty("name");
            String content = (String) entity.getProperty("comment");
            Comment comment = new Comment(name, content);
            comments.add(comment);
            i++;
        }

        Gson gson = new Gson();
        response.setContentType("application/json");
        response.getWriter().println(gson.toJson(comments));
    }
}