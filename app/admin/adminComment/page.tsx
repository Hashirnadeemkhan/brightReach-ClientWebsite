"use client"

import { useState, useEffect } from "react"
import { collection, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Trash2, ArrowRight, Eye } from "lucide-react"
import toast from "react-hot-toast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Comment {
  id: string
  name: string
  comment: string
  timestamp: any
  blogId: string
  approved: boolean | null
  parentId?: string
}

export default function ManageComments() {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("timestamp", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[]
      setComments(commentsData)
    })

    return () => unsubscribe()
  }, [])

  const handleApprove = async (commentId: string) => {
    try {
      const commentRef = doc(db, "comments", commentId)
      await updateDoc(commentRef, { approved: true })
      toast.success("Comment approved")
    } catch (error) {
      console.error("Error approving comment:", error)
      toast.error("Error approving comment")
    }
  }

  const handleDisapprove = async (commentId: string) => {
    try {
      const commentRef = doc(db, "comments", commentId)
      await updateDoc(commentRef, { approved: false })
      toast.success("Comment disapproved")
    } catch (error) {
      console.error("Error disapproving comment:", error)
      toast.error("Error disapproving comment")
    }
  }

  const handleDelete = async (commentId: string) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteDoc(doc(db, "comments", commentId))
        toast.success("Comment deleted")
      } catch (error) {
        console.error("Error deleting comment:", error)
        toast.error("Error deleting comment")
      }
    }
  }

  const getParentComment = (comment: Comment) => {
    return comments.find((c) => c.id === comment.parentId)
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Manage Comments</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Blog ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reply To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.map((comment) => {
            const parentComment = getParentComment(comment)
            return (
              <TableRow key={comment.id}>
                <TableCell>{comment.name}</TableCell>
                <TableCell className="max-w-xs truncate">{comment.comment}</TableCell>
                <TableCell>{comment.blogId}</TableCell>
                <TableCell>{comment.timestamp.toDate().toLocaleString()}</TableCell>
                <TableCell>
                  {comment.approved === true ? "Approved" : comment.approved === false ? "Disapproved" : "Pending"}
                </TableCell>
                <TableCell>
                  {parentComment ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center cursor-pointer text-blue-600 hover:underline">
                            <ArrowRight className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                              {parentComment.name}: {parentComment.comment.substring(0, 20)}...
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-md p-2 bg-gray-800 text-white rounded-md">
                          <p>
                            <strong>{parentComment.name}:</strong> {parentComment.comment}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {parentComment.timestamp.toDate().toLocaleString()}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white"
                      variant="outline"
                      size="sm"
                      onClick={() => handleApprove(comment.id)}
                      disabled={comment.approved === true}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisapprove(comment.id)}
                      disabled={comment.approved === false}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Disapprove
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}