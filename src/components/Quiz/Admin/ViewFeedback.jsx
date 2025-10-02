import React,{useState,useEffect} from "react";
import '../../../customScrollbar.css'

function ViewFeedback(){
    const [quizzes, setQuizzes] = useState([]);
      const [selectedQuizId, setSelectedQuizId] = useState("");
      const [feedbacks, setFeedbacks] = useState([]);
    
      // Fetch quiz list on mount
      useEffect(() => {
          const fetchQuizzes = async () => {
            try {
              const res = await fetch("http://localhost:5000/api/quizzes");
              const data = await res.json();
              setQuizzes(data);
            } catch (err) {
              console.error("Error fetching quizzes:", err);
            }
          };
          fetchQuizzes();
        }, []);
    
      
      useEffect(() => {
        if (!selectedQuizId) return;
    
        const feedback = async () => {
          try {
            const res = await fetch(
              `http://localhost:5000/api/quizzes/feedback/${selectedQuizId}`
            );
            const data = await res.json();
            //console.log("Feedbacks: ", data);
            setFeedbacks(data);
          } catch (err) {
            console.error("Error fetching feedbacks:", err);
          }
        };
    
        feedback();
      }, [selectedQuizId]);
    
      return (
        <div className="flex flex-col justify-between items-center">
          <div className="flex flex-col justify-between">
            <label className="text-4xl text-center" htmlFor="quizSelect">View Feedback</label>
          <select
            id="quizSelect"
            value={selectedQuizId}
            onChange={(e) => setSelectedQuizId(e.target.value)}
            className="border bg-black border-purple-600 m-10 p-5"
          >
            <option value="" className="bg-black text-gray-400">-- Choose a quiz --</option>
            {quizzes.map((quiz) => (
              <option className="bg-black text-gray-400" key={quiz._id} value={quiz._id}>
                {quiz.title}
              </option>
            ))}
          </select>
    
          {feedbacks.length > 0 && (
            
            <table className="border border-purple-600" >
              <thead className="border-b-2 border-purple-600">
                <tr>
                  <th className="border-r-2 border-purple-600 text-center p-4">Sl.No</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Name</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">USN</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Overall Experience</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Career Usefullness</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Venue</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Registration Process</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Workshop Flow</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Workshop Content</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Content Delivery</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Transportation</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Activities</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Key TakeAways</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Logistics Feedback</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Content Suggestion</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Overall Feedback</th>
                  <th className="border-r-2 border-purple-600 text-center p-4">Next Workshop Suggestion</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb, index) => (
                  <tr key={index}>
                    <td className="border-r-2 border-purple-600 text-center p-4">{index + 1}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.user?.name}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.user?.usn}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.OverallExperience}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.CareerUsefulness}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.Venue}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.RegistrationProcess}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.FlowWorkshop}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.content}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.DeliveryContent}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.Transportation}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.Activities}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.KeyTakeAways}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.logisticsFeedback}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.contentSuggestion}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.overallFeedback}</td>
                    <td className="border-r-2 border-purple-600 text-center p-4">{fb.nextWorkshopTopic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          )}
        </div>
        </div>
      );
}

export default ViewFeedback;