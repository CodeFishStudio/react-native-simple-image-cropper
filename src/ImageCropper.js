import React, { PureComponent } from 'react';
import { Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import ImageZoom from 'react-native-image-pan-zoom';
import ImageEditor from '@react-native-community/image-editor';
import { getPercentFromNumber, getPercentDiffNumberFromNumber } from './helpers/percentCalculator';

const window = Dimensions.get('window');
const w = window.width;

class ImageCropper extends PureComponent {
    constructor() {
        super();
        this.imageZoom = React.createRef();
    }

    state = {
        positionX: 0,
        positionY: 0,
        width: 0,
        height: 0,
        minScale: 1,
        adjustedHeight: 0,
        loading: true,
        allowNegativeScale: false,
        ratio: 1,
    };

    static propTypes = {
        imageUri: PropTypes.string.isRequired,
        setCropperParams: PropTypes.func.isRequired,
        setIsCropping: PropTypes.func,
        cropAreaWidth: PropTypes.number,
        cropAreaHeight: PropTypes.number,
        widthRatio: PropTypes.number,
        heightRatio: PropTypes.number,
        allowNegativeScale: PropTypes.bool,
    };

    static defaultProps = {
        setIsCropping: () => {},
        cropAreaWidth: w,
        cropAreaHeight: w,
        widthRatio: 1,
        heightRatio: 1,
        allowNegativeScale: false,
    };

    static crop = params => {
        const {
            imageUri,
            cropSize,
            positionX,
            positionY,
            cropAreaSize,
            srcSize,
            fittedSize,
            scale,
        } = params;

        const offset = {
            x: 0,
            y: 0,
        };

        const cropAreaW = cropAreaSize ? cropAreaSize.width : w;
        const cropAreaH = cropAreaSize ? cropAreaSize.height : w;

        const wScale = cropAreaW / scale;
        const hScale = cropAreaH / scale;

        let percentCropperAreaW = getPercentDiffNumberFromNumber(wScale, fittedSize.w);
        percentCropperAreaW = percentCropperAreaW > 100 ? 100 : percentCropperAreaW;

        const percentRestW = 100 - percentCropperAreaW;
        const hiddenAreaW = getPercentFromNumber(percentRestW, fittedSize.w);

        let percentCropperAreaH = getPercentDiffNumberFromNumber(hScale, fittedSize.h);
        percentCropperAreaH = percentCropperAreaH > 100 ? 100 : percentCropperAreaH;

        const percentRestH = 100 - percentCropperAreaH;
        const hiddenAreaH = getPercentFromNumber(percentRestH, fittedSize.h);

        const x = hiddenAreaW / 2 - positionX;
        const y = hiddenAreaH / 2 - positionY;

        offset.x = x <= 0 ? 0 : x;
        offset.y = y <= 0 ? 0 : y;

        const srcPercentCropperAreaW = getPercentDiffNumberFromNumber(offset.x, fittedSize.w);
        const srcPercentCropperAreaH = getPercentDiffNumberFromNumber(offset.y, fittedSize.h);

        const offsetW = getPercentFromNumber(srcPercentCropperAreaW, srcSize.w);
        const offsetH = getPercentFromNumber(srcPercentCropperAreaH, srcSize.h);

        const sizeW = getPercentFromNumber(percentCropperAreaW, srcSize.w);
        const sizeH = getPercentFromNumber(percentCropperAreaH, srcSize.h);

        offset.x = offsetW;
        offset.y = offsetH;

        //1 landscape, 2 portrait 0 square
        const orientation = sizeW > sizeH ? 1 : sizeH > sizeW ? 2 : 0;

        const displaySize = () => {
            const maxSize = 1000;
            if(orientation === 1 && sizeW > maxSize){
                return {width: maxSize, height: sizeH / (sizeW/maxSize) };
            }
            if(orientation === 2 && sizeH > maxSize){
                return {width: sizeW / (sizeH/maxSize), height: maxSize };
            }
            return {width: sizeW > maxSize ? maxSize : sizeW, height: sizeH > maxSize ? maxSize : sizeH};
        };

        const cropData = {
            offset: offset,
            size: {
                width: sizeW,
                height: sizeH
            },
            displaySize: displaySize(),
        };

        return new Promise((res, rej) => {
            ImageEditor.cropImage(imageUri, cropData)
                .then(uri => res({...cropData, uri}))
                .catch(rej)
        });
    };

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps) {
        const { imageUri } = this.props;
        if (imageUri && prevProps.imageUri !== imageUri) {
            this.init();
        }
    }

    init = () => {
        const { imageUri, allowNegativeScale } = this.props;
        this.setState({allowNegativeScale});

        Image.getSize(imageUri, (width, height) => {
            const { setCropperParams, cropAreaWidth, cropAreaHeight, widthRatio, heightRatio } = this.props;

            let actualWidth = 0;
            let actualHeight = 0;

            if(this.props.imageWidth && this.props.imageHeight) {
                actualWidth = this.props.imageWidth;
                actualHeight = this.props.imageHeight;
            } else {
                actualWidth = width;
                actualHeight = height;
            }

            const srcSize = { w: width, h: height };
            const fittedSize = { w: 0, h: 0 };
            let scale = 1;

            if (actualWidth > actualHeight) {
                const ratio = w / actualHeight;
                fittedSize.w = actualWidth * ratio;
                fittedSize.h = w;
            } else if (actualWidth < actualHeight) {
                const ratio = w / actualWidth;
                fittedSize.w = w;
                fittedSize.h = actualHeight * ratio;
            } else if (actualWidth === actualHeight) {
                fittedSize.w = w;
                fittedSize.h = w;
            }

            let calculatedScale = 1;

            if(!allowNegativeScale) {
                this.setState({orientation: 1})
                if (cropAreaWidth < cropAreaHeight || cropAreaWidth === cropAreaHeight) {
                    if (width < height) {
                        if (fittedSize.h < cropAreaHeight) {
                            scale = Math.ceil((cropAreaHeight / fittedSize.h) * 10) / 10 + 0.0001;
                        } else {
                            scale = Math.ceil((cropAreaWidth / fittedSize.w) * 10) / 10 + 0.0001;
                        }
                    } else {
                        scale = Math.ceil((cropAreaHeight / fittedSize.h) * 10) / 10 + 0.0001;
                    }
                }

                calculatedScale = scale < 1 ? 1.001 : scale;
            } else {

                const ratio = actualWidth / actualHeight;
                this.setState({orientation: ratio});
                calculatedScale = ratio;

                //Portrait image
                if (ratio < 1.0) {
                    const maximumHeight = (heightRatio / widthRatio) * actualWidth;

                    if (ratio < 0.8) {
                        calculatedScale = actualWidth / maximumHeight;
                    }
                }
                //Lanscape image
                else {
                    const maximumWidth = (widthRatio/ heightRatio) * actualHeight;

                    if (ratio > 1.25) {
                        calculatedScale = maximumWidth / actualHeight;
                    }
                }
            }

            this.setState(
                prevState => ({
                    ...prevState,
                    srcSize,
                    fittedSize,
                    minScale: calculatedScale,
                    loading: false,
                }),
                () => {
                    this.imageZoom.current.centerOn({
                        x: 0,
                        y: 0,
                        scale: calculatedScale,
                        duration: 1,
                    });
                    setCropperParams(this.state);
                },
            );
        });
    };

    smartZoom = () => {
        const { setCropperParams } = this.props;

        var scale = 1;

        // If image is zoomed out -> zoom to square = 1
        if (this.state.scale < 1) {
            scale = 1;
        }
        // If image is squared = 1 -> zoom out to minScale - calculated
        else if (this.state.scale === 1) {
            scale = this.state.minScale
        }
        // If image is zoomed in > 1 -> zoom to square = 1
        else {
            scale = 1;
        }

        this.imageZoom.current.centerOn({
            x: 0,
            y: 0,
            scale: scale,
        });

        this.setState({
            scale
        }, () => {
            setCropperParams(this.state);
        })
    }

    handleMove = ({ positionX, positionY, scale }) => {
        const { setCropperParams, setIsCropping } = this.props;

        setIsCropping(!!(scale === 1))

        this.setState(
            prevState => ({
                ...prevState,
                positionX,
                positionY,
                scale,
            }),
            () => setCropperParams(this.state),
        );
    };

    render() {
        const { loading, fittedSize, minScale, allowNegativeScale} = this.state;
        const { imageUri, cropAreaWidth, cropAreaHeight, ...restProps } = this.props;
        const imageSrc = { uri: imageUri };

        return !loading ? (
            <ImageZoom
                ref={this.imageZoom}
                {...restProps}
                cropWidth={cropAreaWidth}
                cropHeight={cropAreaHeight}
                imageWidth={fittedSize.w}
                imageHeight={fittedSize.h}
                minScale={minScale}
                enableCenterFocus={!allowNegativeScale}
                onMove={this.handleMove}
            >
                <Image style={{ width: fittedSize.w, height: fittedSize.h }} source={imageSrc} />
            </ImageZoom>
        ) : null;
    }
}

export default ImageCropper;