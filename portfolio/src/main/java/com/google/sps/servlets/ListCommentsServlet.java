
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
        Gson gson = new Gson();
        response.setContentType("application/json");
        int maxInput;
        try {
            maxInput = Integer.parseInt(maxInputString);
        } catch (NumberFormatException e) {
            response.getWriter().println(gson.toJson(""));
            System.err.println("Poor number format. Returning with nothing.");
            return;
        }

        if (maxInput == 0) {
            response.getWriter().println(gson.toJson(""));
            return; //early return to prevent unnecessary data reads
        }
        
        //get the type of the comments to be found from the request parameters
        Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
        DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = ds.prepare(query);

        //Create all comments to be returned from query
        List<Comment> comments = new ArrayList<>();
        int i = 0;
        for (Entity entity : results.asIterable()) {
            if (i >= maxInput) {
                break;
            }
            String name = (String) entity.getProperty("name");
            String content = (String) entity.getProperty("comment");
            long timestamp = (long) entity.getProperty("timestamp");
            Comment comment = new Comment(name, content, timestamp);
            comments.add(comment);
            i++;
        }

        response.getWriter().println(gson.toJson(comments));
    }
}