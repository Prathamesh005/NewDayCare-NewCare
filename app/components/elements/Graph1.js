import React from 'react';
import DagreGraph from 'dagre-d3-react';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as d3 from 'd3';

const styles = theme => ({
    // path :{
    //     stroke: 'black',
    //     fill: 'black',
    //     strokeWidth: '1.0px'
    // },
    graph:{
        margin:'20px auto',
        alignItems:'center',
        textAlign: 'center',
        //color:'#000',
        width:'100%',
        height:'800px',
        fontSize:'10'
    },
    // paths :{
    //     stroke: 'red',
    //     fill: 'red',
    //     strokeWidth: '1.0px',
    // },

    // root: {
    //     minWidth: 275,
    //   },
    //   title: {
    //     fontSize: 14,
    //   },
    //   pos: {
    //     marginBottom: 12,
    //   },
    //  Size:{
    //   width:"800px !important",
    // }
})


 function DataGraph(props){
   
        const{classes}=props;
        const [data,setdata] = React.useState(false)
        const [carddata,setCardData] = React.useState([])


        const content=(e)=>{
            // console.log('event',e)
            setdata(!data);
            setCardData(e.original);
        };

        // console.log('carddata', carddata)
        return (
            <div className={classes.graph}   style={{  flexDirection: "column",}}>
            
            <DagreGraph
               className={classes.graph}
                nodes={ [
                    {
                        id: "1",
                        label: `${data==false?'Start':'Start <p> value </p>'}`,
                      },
                    {
                      id: "2",
                      label: "Node Status",
                      
                    },
                    {
                        id: "3",
                        label: "Tumor Size",
                       
                      },
                      {
                        id: "4",
                        label: "Chemotherapy TCH AC + TH",
                       
                      },
                      {
                        id: "5",
                        label: "Chemotherapy TH Weekly",
                       
                      },
                      {
                        id: "6",
                        label: "Post-Chemotherapy Trastuzumab Request",
                       
                      },
                      {
                        id: "7",
                        label: "ER Status",
                       
                      },
                      {
                        id: "8",
                        label: "Endocrine Therapy",
                      },

                  ]}
                links={[
                    {
                        source: "1",
                        target: "2",
                        label: '',
                    },
                    {
                        source: "2",
                        target: "3", 
                        label: 'No'
                    },
                    {
                        source: "2",
                        target: "4", 
                        label: 'N+',
                    },
                    {
                        source: "3",
                        target: "4",
                        label: 'To'
                    },
                    {
                        source: "3",
                        target: "5",
                        label: 'T <= 2cm'
                    },
                    {
                        source: "5",
                        target: "6",
                        label: ''
                    },
                    {
                        source: "4",
                        target: "6",
                        label: ''
                    },
                    {
                        source: "6",
                        target: "7",
                        label: ''
                    },
                    {
                        source: "7",
                        target: "8",
                        label: ''
                    }
                  ]}
               
                options={{
                    // rankdir: 'LR',
                    // align: 'UL',
                    // ranker: 'tight-tree'
                }}
                options={{
                    rankdir: 'TB',
                    align: 'UR',
                    ranker: 'tight-tree',
                }}
                
                // width='500'
                // height='500'
                // animate={1000}
                shape='rect'
                fitBoundaries
                zoomable
                onNodeClick={e => content(e)}
                onRelationshipClick={e => console.log(e)}
            />

        </div>
        )
   
}

export  default withStyles(styles)(DataGraph);

