// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  /* 
    Get a list of messages to cooperate with the tutorial
  */
  private List<String> getMessages() {
      List<String> messages = new ArrayList<>();
      messages.add("Hi! How are you doing?");
      messages.add("It's raining in Seattle :(");
      messages.add("What's hobbies do you have?");
      return messages;
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Gson gson = new Gson();
    String jsonMessage = gson.toJson(getMessages());
    response.setContentType("application/json");
    response.getWriter().println(jsonMessage);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    //Get inputs from the form
    String name = getParameter(request, "name-input", "");
    String comment = getParameter(request, "comment-input", "");

    List<String> commentForm = new ArrayList<>();
    commentForm.add(name);
    commentForm.add(comment);

    //Respond with the result
    response.setContentType("text/html");
    response.getWriter().println(commentForm);
  }

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}

